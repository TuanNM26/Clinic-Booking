import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShiftDto } from '../dto/create-shift.dto';
import { UpdateShiftDto } from '../dto/update-shift.dto';
import { ShiftRepository } from '../repositories/shifts.repository';
import { Shift } from '../entities/shift.entity';
import { plainToInstance } from 'class-transformer';
import { AvailableShiftDto } from '../dto/AvailableShiftDto';
import { ResponseShiftDto } from '../dto/response.shift.dto';

@Injectable()
export class ShiftsService {
  constructor(private readonly shiftRepository: ShiftRepository) {}

  async create(createShiftDto: CreateShiftDto): Promise<ResponseShiftDto> {
    const createdShift = await this.shiftRepository.create(createShiftDto);
    return plainToInstance(ResponseShiftDto, createdShift, { excludeExtraneousValues: true });
  }

  async findAll(): Promise<ResponseShiftDto[]> {
    const shifts = await this.shiftRepository.findAll();
    return plainToInstance(ResponseShiftDto, shifts, { excludeExtraneousValues: true });
  }

  async findOne(id: string): Promise<ResponseShiftDto> {
    const shift = await this.shiftRepository.findOne(id);
    if (!shift) {
      throw new NotFoundException(`Shift with ID "${id}" not found`);
    }
    return plainToInstance(ResponseShiftDto, shift, { excludeExtraneousValues: true });
  }

  async update(id: string, updateShiftDto: UpdateShiftDto): Promise<ResponseShiftDto> {
    const shift = await this.shiftRepository.findOne(id);
    if (!shift) {
      throw new NotFoundException(`Shift with ID "${id}" not found`);
    }
    await this.shiftRepository.update(id, updateShiftDto);
    const updatedShift = await this.findOne(id);
    return updatedShift;
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