import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Shift } from './entities/shift.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Injectable()
export class ShiftRepository {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
  ) {}

  async create(createShiftDto: CreateShiftDto): Promise<Shift> {
    const shift = this.shiftRepository.create(createShiftDto);
    return await this.shiftRepository.save(shift);
  }

  async findAll(): Promise<Shift[]> {
    return await this.shiftRepository.find();
  }

  async findOne(id: string): Promise<Shift | null> {
    return await this.shiftRepository.findOneBy({ id });
  }

  async update(id: string, updateShiftDto: UpdateShiftDto): Promise<Shift | null> {
    await this.shiftRepository.update(id, updateShiftDto);
    return await this.shiftRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.shiftRepository.softDelete(id);
  }

  async getAvailableShifts(specializationId: string, doctorId: string, date: string) {
    return this.shiftRepository
      .createQueryBuilder('shift')
      .leftJoinAndSelect('shift.doctorShifts', 'doctorShift')
      .leftJoinAndSelect('doctorShift.doctor', 'doctor')
      .leftJoinAndSelect('doctor.specialization', 'specialization')
      .where('shift.date = :date', { date })
      .andWhere('specialization.id = :specializationId', { specializationId })
      .andWhere('doctor.id = :doctorId', {doctorId})
      .getMany();
  }
  
}