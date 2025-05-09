import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDoctorShiftDto } from '../dto/create-doctor-shift.dto';
import { UpdateDoctorShiftDto } from '../dto/update-doctor-shift.dto';
import { DoctorShiftRepository } from '../repositories/doctor-shift.repository';
import { DoctorShift } from '../entities/doctor-shift.entity';
import { plainToInstance } from 'class-transformer';
import { DoctorShiftScheduleDto } from '../dto/DoctorShiftSchedule.dto';
import { DoctorShiftDto } from '../dto/response.doctorShift.dto';
import { CancelShiftDto } from '../dto/cancelShift.dto';
import { AppointmentsService } from 'src/modules/appointments/services/appointments.service';
import { AppointmentStatus } from 'src/common/enum/status.enum';
import { MailService } from 'src/modules/mails/mail.service';
import { DoctorShiftStatus } from 'src/common/enum/doctorShift.status.enum';
import { ShiftsService } from 'src/modules/shifts/services/shifts.service';

@Injectable()
export class DoctorShiftsService {
  constructor(
    private readonly doctorShiftRepository: DoctorShiftRepository,
    private readonly appointmentService: AppointmentsService,
    private readonly mailService: MailService,
    private readonly shiftService: ShiftsService,
  ) {}

  async create(
    createDoctorShiftDto: CreateDoctorShiftDto,
  ): Promise<DoctorShiftDto> {
    const createdDoctorShift = await this.doctorShiftRepository.create(
      createDoctorShiftDto,
    );
    return plainToInstance(DoctorShiftDto, createdDoctorShift, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<DoctorShiftDto[]> {
    const doctorShifts = await this.doctorShiftRepository.findAll();
    return plainToInstance(DoctorShiftDto, doctorShifts, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(doctorId: string, shiftId: string): Promise<DoctorShiftDto> {
    const doctorShift = await this.doctorShiftRepository.findOne(
      doctorId,
      shiftId,
    );
    if (!doctorShift) {
      throw new NotFoundException(
        `DoctorShift with doctor ID "${doctorId}" and shift ID "${shiftId}" not found`,
      );
    }
    return plainToInstance(DoctorShiftDto, doctorShift, {
      excludeExtraneousValues: true,
    });
  }

  async findShiftsByDoctorAndDate(
    doctorId: string,
    date: string,
  ): Promise<DoctorShiftDto[]> {
    console.log(date);
    const doctorShifts =
      await this.doctorShiftRepository.findShiftsByDoctorAndDate(
        doctorId,
        date,
      );

    if (!doctorShifts || doctorShifts.length === 0) {
      throw new NotFoundException(
        `No DoctorShifts found for doctor ID "${doctorId}" and date "${date}"`,
      );
    }

    return doctorShifts.map((shift) =>
      plainToInstance(DoctorShiftDto, shift, { excludeExtraneousValues: true }),
    );
  }

  async getSlotsByDoctorAndDate(
    doctorId: string,
    date: string,
  ): Promise<string[]> {
    const slots = await this.doctorShiftRepository.getDoctorTimeSlots(
      doctorId,
      date,
    );

    if (!slots || slots.length === 0) {
      throw new NotFoundException(
        `No slots found for doctor ID "${doctorId}" and date "${date}"`,
      );
    }

    return slots;
  }

  async update(
    doctorId: string,
    shiftId: string,
    updateDoctorShiftDto: UpdateDoctorShiftDto,
  ): Promise<DoctorShiftDto> {
    const existingDoctorShift = await this.doctorShiftRepository.findOne(
      doctorId,
      shiftId,
    );
    if (!existingDoctorShift) {
      throw new NotFoundException(
        `DoctorShift with doctor ID "${doctorId}" and shift ID "${shiftId}" not found`,
      );
    }
    await this.doctorShiftRepository.update(
      doctorId,
      shiftId,
      updateDoctorShiftDto,
    );
    const updatedDoctorShift = await this.findOne(
      doctorId,
      updateDoctorShiftDto.shiftId,
    );
    return updatedDoctorShift;
  }

  async remove(
    doctorId: string,
    shiftId: string,
  ): Promise<{ message: string }> {
    const existingDoctorShift = await this.doctorShiftRepository.findOne(
      doctorId,
      shiftId,
    );
    if (!existingDoctorShift) {
      throw new NotFoundException(
        `DoctorShift with doctor ID "${doctorId}" and shift ID "${shiftId}" not found`,
      );
    }
    await this.doctorShiftRepository.remove(doctorId, shiftId);
    return {
      message: `DoctorShift with doctor ID "${doctorId}" and shift ID "${shiftId}" has been successfully deleted`,
    };
  }
  async getScheduleByDoctorIdWithFilter(
    doctorId: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    const data = await this.doctorShiftRepository.findByDoctorIdWithTimeFilter(
      doctorId,
      startDate,
      endDate,
    );
    return plainToInstance(DoctorShiftScheduleDto, data, {
      excludeExtraneousValues: true,
    });
  }

  async cancelShift(
    doctorId: string,
    shiftId: string,
    date: Date,
    cancelShiftDto: CancelShiftDto,
  ) {
    const { reason } = cancelShiftDto;
  
    const doctorShift = await this.doctorShiftRepository.findOneByDate(
      doctorId,
      shiftId,
      date,
    );
  
    if (!doctorShift) {
      throw new Error('Shift is not exist');
    }
  
    const shift = await this.shiftService.findOne(shiftId);
  
    if (!shift || !shift.start_time) {
      throw new Error('Shift information is not valid');
    }
  
    const [hours, minutes, seconds = 0] = shift.start_time.split(':').map(Number);
    const shiftStartDateTime = new Date(doctorShift.date);
    shiftStartDateTime.setHours(hours);
    shiftStartDateTime.setMinutes(minutes);
    shiftStartDateTime.setSeconds(seconds);
  
    const now = new Date();
    const timeDifference = shiftStartDateTime.getTime() - now.getTime();
  
    if (timeDifference < 60 * 60 * 1000) {
      throw new BadRequestException('Can not cancel because time too close');
    }
  
    await this.doctorShiftRepository.updateShiftStatus(
      doctorId,
      shiftId,
      date,
      DoctorShiftStatus.CANCELLED,
    );
  
    const appointments = await this.appointmentService.findAppointmentsByShiftAndTime(
      doctorId,
      shiftId,
      date,
    );
  
    if (appointments && appointments.length > 0) {
      await Promise.all(
        appointments.map((appointment) =>
          this.appointmentService.cancelAppointment(
            appointment.id,
            AppointmentStatus.CANCELLED,
            reason,
          )
        )
      );
    }
  }  
}
