import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto';
import { AppointmentStatus } from 'src/common/enum/status.enum';

@Injectable()
export class AppointmentsRepository {
  
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentRepository.save(this.appointmentRepository.create(createAppointmentDto));
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
    appointment.status = status;
    return this.appointmentRepository.save(appointment);
  }
  
  async updateNotes(id: string, notes: string): Promise<Appointment | undefined> {
    const appointment = await this.appointmentRepository.findOne({ where: { id }});

    console.log(appointment);
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
}