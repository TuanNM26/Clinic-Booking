import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto';
import { AppointmentsRepository } from '../repositories/appointments.repository';
import { Appointment } from '../entities/appointment.entity';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AppointmentResponseDto } from '../dto';
import { AppointmentStatus } from 'src/common/enum/status.enum';
import { MailService } from 'src/modules/mails/mail.service';
import { DoctorShiftRepository } from 'src/modules/doctor-shifts/repositories/doctor-shift.repository';
import { UsersRepository } from 'src/modules/users/repositories/user.repository';
import { ShiftRepository } from 'src/modules/shifts/repositories/shifts.repository';
import { UsersService } from 'src/modules/users/services/users.service';
import { ShiftsService } from 'src/modules/shifts/services/shifts.service';
import { DoctorShiftsService } from 'src/modules/doctor-shifts/services/doctor-shifts.service';

@Injectable()
export class AppointmentsService {
  
  
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository, 
    private readonly mailService: MailService,
    private readonly doctorService: UsersService,
    private readonly shiftService: ShiftsService,
    @Inject(forwardRef(() => DoctorShiftsService))
     private readonly doctorShiftService: DoctorShiftsService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentResponseDto> {
    const appointment = await this.appointmentsRepository.createAppointment(createAppointmentDto);

    const patientEmail = appointment.email; 
    const patientName = appointment.full_name; 
    const doctorId = appointment.doctor_id;
    const shiftId = appointment.shift_id;
    const appointmentDate = appointment.appointment_date;

    const doctor = await this.doctorService.findOne(doctorId);
    const doctorName = doctor ? doctor.full_name : 'Không xác định';

    const shift = await this.shiftService.findOne(shiftId);
    const appointmentTime = shift.start_time;

    const appointmentDetails = {
      patientName: patientName,
      doctorName: doctorName,
      appointmentTime: appointmentTime,
      appointmentDate: appointmentDate,
    };

    await this.mailService.sendAppointmentNotification(
      patientEmail,
      'Xác nhận lịch hẹn khám',
      appointmentDetails,
      'patientConfirmShedule', 
    );

    await this.mailService.sendAppointmentNotification(
      doctor.email,
      'Xác nhận lịch hẹn khám',
      appointmentDetails,
      'doctorNewAppointment', 
    );

    return plainToInstance(AppointmentResponseDto,appointment, {excludeExtraneousValues : true})
  }

  async findAll(query: any): Promise<Appointment[]> {
    const findOptions: FindManyOptions<Appointment> = {};

    if (query.doctorId) {
      findOptions.where = { ...findOptions.where, doctor_id: query.doctorId };
    }
    if (query.shiftId) {
      findOptions.where = { ...findOptions.where, shift_id: query.shiftId };
    }
    if (query.specializedId) {
      findOptions.where = { ...findOptions.where, specialized_id: query.specializedId };
    }
    if (query.status) {
      findOptions.where = { ...findOptions.where, status: query.status };
    }
    if (query.date) {
      findOptions.where = { ...findOptions.where, appointment_date: query.date };
    }

    return this.appointmentsRepository.findAllAppointments(findOptions);
  }

  async findOne(id: string): Promise<Appointment> {
    return this.appointmentsRepository.findAppointmentById(id);
  }

  async findAppointmentsByShift(doctorId: string, shiftId: string): Promise<Appointment[]> {
    return this.appointmentsRepository.findAppointmentsByShift(doctorId,shiftId);
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    return this.appointmentsRepository.updateAppointment(id, updateAppointmentDto);
  }

  async updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<Appointment> {
    const updatedAppointment = await this.appointmentsRepository.updateStatus(id, status);
    if (!updatedAppointment) {
      throw new NotFoundException(`Không tìm thấy lịch hẹn với ID ${id}`);
    }
    const appointment = this.findOne(id);

    const doctor = await this.doctorService.findOne((await appointment).doctor_id);
    const doctorName = doctor ? doctor.full_name : 'Không xác định';

    const shift = await this.shiftService.findOne((await appointment).shift_id);
    const appointmentTime = shift.start_time;

    const appointmentDetails = {
      patientName: (await appointment).full_name,
      doctorName: doctorName,
      appointmentTime: appointmentTime,
      appointmentDate: (await appointment).appointment_date,
      doctorNote: (await appointment).notes,
      status: status
    };

    await this.mailService.sendAppointmentNotification(
      (await appointment).email,
      'Cập nhật thông tin lịch khám',
      appointmentDetails,
      'doctorUpdateAppointment', 
    );

    return updatedAppointment;
  }

  async cancelAppointment(id: string, status: AppointmentStatus, reason:string): Promise<Appointment> {
    const updatedAppointment = await this.appointmentsRepository.cancelAppointment(id, status,reason);
    if (!updatedAppointment) {
      throw new NotFoundException(`Không tìm thấy lịch hẹn với ID ${id}`);
    }
    const appointment = this.findOne(id);

    const doctor = await this.doctorService.findOne((await appointment).doctor_id);
    const doctorName = doctor ? doctor.full_name : 'Không xác định';

    const shift = await this.shiftService.findOne((await appointment).shift_id);
    const appointmentTime = shift.start_time;

    const appointmentDetails = {
      patientName: (await appointment).full_name,
      doctorName: doctorName,
      appointmentTime: appointmentTime,
      appointmentDate: (await appointment).appointment_date,
      doctorNote: (await appointment).notes,
      status: status,
      reason: reason
    };

    await this.mailService.sendAppointmentNotification(
      (await appointment).email,
      'Cập nhật thông tin lịch khám',
      appointmentDetails,
      'cancel-appointment', 
    );

    return updatedAppointment;
  }

  async updateAppointmentNotes(id: string, notes: string): Promise<Appointment> {
    const updatedAppointment = await this.appointmentsRepository.updateNotes(id, notes);
    if (!updatedAppointment) {
      throw new NotFoundException(`Không tìm thấy lịch hẹn với ID ${id}`);
    }

    const appointment = this.findOne(id);

    const doctor = await this.doctorService.findOne((await appointment).doctor_id);
    const doctorName = doctor ? doctor.full_name : 'Không xác định';

    const shift = await this.shiftService.findOne((await appointment).shift_id);
    const appointmentTime = shift.start_time;

    const appointmentDetails = {
      patientName: (await appointment).full_name,
      doctorName: doctorName,
      appointmentTime: appointmentTime,
      appointmentDate: (await appointment).appointment_date,
      doctorNote: notes,
      status: (await appointment).status
    };

    await this.mailService.sendAppointmentNotification(
      (await appointment).email,
      'Cập nhật thông tin lịch khám',
      appointmentDetails,
      'doctorUpdateAppointment', 
    );

    return updatedAppointment;
  }

  async remove(id: string): Promise<void> {
    return this.appointmentsRepository.deleteAppointment(id);
  }

  async getStatus(id: string) {
    return this.appointmentsRepository.getStatusById(id);
  }

  async findAllForDoctor(query: any, id: string): Promise<AppointmentResponseDto[]> {
    const appointments = await this.appointmentsRepository.findAllForDoctor(query, id);
    return plainToInstance(AppointmentResponseDto, appointments, {
      excludeExtraneousValues: true,
    });
  }

  async find(options: FindManyOptions<Appointment>): Promise<Appointment[]> {
    return this.appointmentsRepository.find(options);
  }

  async getAppointmentStatistics() {
    return this.appointmentsRepository.getStatistics();
  }

  async getShiftIdByTime(doctorId: string, startTime: string): Promise<string> {
    const shifts = await this.doctorShiftService.findShiftsByDoctorAndDate(doctorId, new Date().toISOString().split('T')[0]); 
    for (const shift of shifts) {
      const shiftStart = shift.start_time;  
      const shiftEnd = shift.end_time;     

      if (this.isTimeInShiftRange(startTime, shiftStart, shiftEnd)) {
        return shift.shift_id;
      }
    }

    throw new BadRequestException('Giờ khám không hợp lệ');
  }

  private isTimeInShiftRange(startTime: string, shiftStart: string, shiftEnd: string): boolean {
    const startTimeMinutes = this.convertTimeToMinutes(startTime);
    const shiftStartMinutes = this.convertTimeToMinutes(shiftStart);
    const shiftEndMinutes = this.convertTimeToMinutes(shiftEnd);

    return startTimeMinutes >= shiftStartMinutes && startTimeMinutes < shiftEndMinutes;
  }

  private convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}