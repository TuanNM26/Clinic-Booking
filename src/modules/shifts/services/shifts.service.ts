import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShiftDto } from '../dto/create-shift.dto';
import { UpdateShiftDto } from '../dto/update-shift.dto';
import { ShiftRepository } from '../repositories/shifts.repository';
import { Shift } from '../entities/shift.entity';
import { plainToInstance } from 'class-transformer';
import { AvailableShiftDto } from '../dto/AvailableShiftDto';

@Injectable()
export class ShiftsService {
  constructor(private readonly shiftRepository: ShiftRepository) {}

  async create(createShiftDto: CreateShiftDto): Promise<Shift> {
    return this.shiftRepository.create(createShiftDto);
  }

  async findAll(): Promise<Shift[]> {
    return this.shiftRepository.findAll();
  }

  async findOne(id: string): Promise<Shift> {
    const shift = await this.shiftRepository.findOne(id);
    if (!shift) {
      throw new NotFoundException(`Shift with ID "${id}" not found`);
    }
    return shift;
  }

  async update(id: string, updateShiftDto: UpdateShiftDto): Promise<Shift> {
    const shift = await this.shiftRepository.findOne(id);
    if (!shift) {
      throw new NotFoundException(`Shift with ID "${id}" not found`);
    }
    await this.shiftRepository.update(id, updateShiftDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ message: string }> {
    const shift = await this.shiftRepository.findOne(id);
    if (!shift) {
      throw new NotFoundException(`Shift with ID "${id}" not found`);
    }
    await this.shiftRepository.remove(id);
    return { message: `Shift with ID "${id}" has been successfully deleted` };
  }

  async getAvailableShifts(specializationId: string, doctorId : string ,date: string ) {
    const shifts = await this.shiftRepository.getAvailableShifts(specializationId, doctorId, date);
  
    return plainToInstance(AvailableShiftDto, shifts, { excludeExtraneousValues: true });
  }
  
  
}