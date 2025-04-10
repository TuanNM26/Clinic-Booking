import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository, FindManyOptions } from 'typeorm';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentsRepository.create(createAppointmentDto);
    return this.appointmentsRepository.save(appointment);
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
    // Add more filtering options based on your needs

    return this.appointmentsRepository.find(findOptions);
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID "${id}" not found`);
    }
    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);
    await this.appointmentsRepository.merge(appointment, updateAppointmentDto);
    return this.appointmentsRepository.save(appointment);
  }

  async remove(id: string): Promise<void> {
    const result = await this.appointmentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID "${id}" not found`);
    }
  }
}