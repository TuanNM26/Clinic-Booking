import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto';
import { AppointmentStatus } from 'src/common/enum/status.enum';
import { ShiftsService } from 'src/modules/shifts/services/shifts.service';
import { DoctorShiftsService } from 'src/modules/doctor-shifts/services/doctor-shifts.service';

@Injectable()
export class AppointmentsRepository {
  
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly shiftService: ShiftsService,
    @Inject(forwardRef(() => DoctorShiftsService))
    private readonly doctorShiftService: DoctorShiftsService,
  ) {console.log('✅ AppointmentsRepository initialized');}

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { doctor_id, shift_id, appointment_date } = createAppointmentDto;
  
    const shift = await this.shiftService.findOne(shift_id);
    if (!shift) {
      throw new HttpException('Ca làm không tồn tại.', HttpStatus.NOT_FOUND);
    }
  
    const isDoctorAssigned = await this.doctorShiftService.findOne(doctor_id,shift_id)
    if (!isDoctorAssigned) {
      throw new HttpException(
        'Bác sĩ chưa được phân ca làm này.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    const now = new Date();
    const shiftDateTime = new Date(`${shift.date}T${shift.start_time}`);
    if (shiftDateTime < now) {
      throw new HttpException(
        'Không thể đặt lịch khám trong ca đã qua.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        doctor_id,
        shift_id,
        appointment_date,
      },
    });
  
    if (existingAppointment) {
      throw new HttpException(
        'Đã có lịch hẹn trùng lặp vào thời gian này.',
        HttpStatus.CONFLICT,
      );
    }
    return this.appointmentRepository.save(
      this.appointmentRepository.create(createAppointmentDto),
    );
  }

  async findAllAppointments(options: any): Promise<Appointment[]> {
    return this.appointmentRepository.find(options);
  }

  async findAppointmentById(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID "${id}" not found`);
    }
    return appointment;
  }

  async findAppointmentsByShift(
    doctorId: string,
    shiftId: string
  ): Promise<Appointment[]> {
    console.log(doctorId + shiftId)
    const appointments = await this.appointmentRepository.find({
      where: {
        doctor_id: doctorId,
        shift_id: shiftId
      },
    });
    if (!appointments || appointments.length === 0) {
      throw new NotFoundException(`Appointments for doctor ID "${doctorId}" and shift ID "${shiftId}" not found`);
    }
    return appointments;
  }
  

  async updateAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findAppointmentById(id);
    this.appointmentRepository.merge(appointment, updateAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  async updateStatus(id: string, status: AppointmentStatus): Promise<Appointment | undefined> {
    const appointment = await this.appointmentRepository.findOne({ where: { id }});
    if (!appointment) {
      return undefined;
    }
    if (appointment.status === AppointmentStatus.CONFIRMED && status === AppointmentStatus.CONFIRMED) {
      throw new BadRequestException('Lịch hẹn này đã được xác nhận.');
    }
    appointment.status = status;
    return this.appointmentRepository.save(appointment);
  }

  async cancelAppointment(id: string, status: AppointmentStatus, reason: string): Promise<Appointment | undefined> {
    const appointment = await this.appointmentRepository.findOne({ where: { id }});
    if (!appointment) {
      return undefined;
    }
    if (appointment.status === AppointmentStatus.CONFIRMED && status === AppointmentStatus.CONFIRMED) {
      throw new BadRequestException('Lịch hẹn này đã được xác nhận.');
    }
    appointment.status = status;
    appointment.reason_canceled = reason;
    return this.appointmentRepository.save(appointment);
  }
  
  async updateNotes(id: string, notes: string): Promise<Appointment | undefined> {
    const appointment = await this.appointmentRepository.findOne({ where: { id }});
    if (!appointment) {
      return undefined;
    }
    appointment.notes = notes;
    return this.appointmentRepository.save(appointment);
  }

  async deleteAppointment(id: string): Promise<void> {
    const result = await this.appointmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID "${id}" not found`);
    }
  }

  async getStatusById(id: string) {
    return this.appointmentRepository.findOne({ where: { id }, select: ['id', 'status', 'updatedAt'] });
  }

  async findAllForDoctor(query: any, doctorId: any): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: {
        ...query,
        doctor_id: doctorId,
      },
    });
  }

  async find(options: FindManyOptions<Appointment>): Promise<Appointment[]> {
    return this.appointmentRepository.find(options);
  }
}