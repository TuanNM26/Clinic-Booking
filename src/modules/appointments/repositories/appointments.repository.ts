import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto';
import { AppointmentStatus } from 'src/common/enum/status.enum';
import { ShiftsService } from 'src/modules/shifts/services/shifts.service';
import { DoctorShiftsService } from 'src/modules/doctor-shifts/services/doctor-shifts.service';
import { AppointmentStatisticsDto } from '../dto/appointment-statistics.dto';

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
    const { doctor_id, shift_id, appointment_date, start_time } = createAppointmentDto;
  
  
    const shift = await this.shiftService.findOne(shift_id);
    if (!shift) {
      throw new HttpException('Ca làm không tồn tại.', HttpStatus.NOT_FOUND);
    }
  
    const isDoctorAssigned = await this.doctorShiftService.findOne(doctor_id, shift_id);
    if (!isDoctorAssigned) {
      throw new HttpException('Bác sĩ chưa được phân ca làm này.', HttpStatus.BAD_REQUEST);
    }
  
    const now = new Date();
    const shiftDateTime = new Date(`${shift.date}T${shift.start_time}`);
    if (shiftDateTime < now) {
      throw new HttpException('Không thể đặt lịch khám trong ca đã qua.', HttpStatus.BAD_REQUEST);
    }
  
    const existingAppointments = await this.appointmentRepository.find({
      where: {
        doctor_id,
        appointment_date,
      },
    });
  
    const [newHour, newMinute] = start_time.split(':').map(Number);
    const newStartMinutes = newHour * 60 + newMinute;

    const hasConflict = existingAppointments.some((appointment) => {
      const [existingHour, existingMinute] = appointment.start_time.split(':').map(Number);
      const existingStartMinutes = existingHour * 60 + existingMinute;
  
      const diffInMinutes = Math.abs(existingStartMinutes - newStartMinutes);
      return diffInMinutes < 30;
    });
  
    if (hasConflict) {
      throw new HttpException(
        'Đã có lịch hẹn khác gần thời gian này (dưới 30 phút).',
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

  async getStatistics(): Promise<AppointmentStatisticsDto> {
  const appointments = await this.appointmentRepository.find({
    relations: ['doctor'], 
  });

  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(a => a.status === AppointmentStatus.CONFIRMED).length;
  const pendingAppointments = appointments.filter(a => a.status === AppointmentStatus.PENDING).length;
  const canceledAppointments = appointments.filter(a => a.status === AppointmentStatus.CANCELLED).length;

  const appointmentsPerDoctorRaw: Record<string, number> = {};
  const patientVisitMap: Record<string, number> = {};
  let totalConfirmationDelayInHours = 0;
  let confirmedCount = 0;

  for (const appt of appointments) {
    if (appt.doctor_id) {
      appointmentsPerDoctorRaw[appt.doctor_id] = (appointmentsPerDoctorRaw[appt.doctor_id] || 0) + 1;
    }

    const identity = appt.identity_number;
    if (identity) {
      patientVisitMap[identity] = (patientVisitMap[identity] || 0) + 1;
    }

    if (appt.status === AppointmentStatus.CONFIRMED && appt.createdAt && appt.updatedAt) {
      const delayInHours = (appt.updatedAt.getTime() - appt.createdAt.getTime()) / (1000 * 60 * 60);
      totalConfirmationDelayInHours += delayInHours;
      confirmedCount++;
    }
  }

  const appointmentsPerDoctor: Record<string, number> = {};
  for (const appt of appointments) {
    if (appt.doctor && appointmentsPerDoctorRaw[appt.doctor_id]) {
      const doctorName = appt.doctor.full_name || 'Không rõ tên bác sĩ';
      appointmentsPerDoctor[doctorName] = appointmentsPerDoctorRaw[appt.doctor_id];
    }
  }

  const confirmationRate = totalAppointments ? confirmedAppointments / totalAppointments : 0;
  const cancellationRate = totalAppointments ? canceledAppointments / totalAppointments : 0;
  const newPatientCount = Object.values(patientVisitMap).filter(v => v === 1).length;
  const returningPatientCount = Object.values(patientVisitMap).filter(v => v > 1).length;
  const averageConfirmationTimeInHours = confirmedCount ? totalConfirmationDelayInHours / confirmedCount : 0;

  return {
    totalAppointments,
    confirmedAppointments,
    pendingAppointments,
    canceledAppointments,
    confirmationRate: +confirmationRate.toFixed(2),
    cancellationRate: +cancellationRate.toFixed(2),
    appointmentsPerDoctor,
    newPatientCount,
    returningPatientCount,
    averageConfirmationTimeInHours: +averageConfirmationTimeInHours.toFixed(2),
  };
}

}