import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto';
import { AppointmentsRepository } from '../repositories/appointments.repository';
import { Appointment } from '../entities/appointment.entity';
import { FindManyOptions } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AppointmentResponseDto } from '../dto';
import { AppointmentStatus } from 'src/common/enum/status.enum';

@Injectable()
export class AppointmentsService {
  
  
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentResponseDto> {
    const appointment =  this.appointmentsRepository.createAppointment(createAppointmentDto);
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

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    return this.appointmentsRepository.updateAppointment(id, updateAppointmentDto);
  }

  async updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<Appointment> {
    const updatedAppointment = await this.appointmentsRepository.updateStatus(id, status);
    if (!updatedAppointment) {
      throw new NotFoundException(`Không tìm thấy lịch hẹn với ID ${id}`);
    }
    return updatedAppointment;
  }

  async updateAppointmentNotes(id: string, notes: string): Promise<Appointment> {
    const updatedAppointment = await this.appointmentsRepository.updateNotes(id, notes);
    if (!updatedAppointment) {
      throw new NotFoundException(`Không tìm thấy lịch hẹn với ID ${id}`);
    }
    return updatedAppointment;
  }

  async remove(id: string): Promise<void> {
    return this.appointmentsRepository.deleteAppointment(id);
  }

  async getStatus(id: string) {
    return this.appointmentsRepository.getStatusById(id);
  }

  findAllForDoctor(query: any, id: string): Appointment[] | PromiseLike<Appointment[]> {
    return this.appointmentsRepository.findAllForDoctor(query, id);
  }
}