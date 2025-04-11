import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorShiftDto } from './dto/create-doctor-shift.dto';
import { UpdateDoctorShiftDto } from './dto/update-doctor-shift.dto';
import { DoctorShiftRepository } from './doctor-shift.repository';
import { DoctorShift } from './entities/doctor-shift.entity';
import { plainToInstance } from 'class-transformer';
import { DoctorShiftScheduleDto } from './dto/DoctorShiftSchedule.dto';

@Injectable()
export class DoctorShiftsService {
  constructor(private readonly doctorShiftRepository: DoctorShiftRepository) {}

  async create(createDoctorShiftDto: CreateDoctorShiftDto): Promise<DoctorShift> {
    console.log(createDoctorShiftDto);
    return this.doctorShiftRepository.create(createDoctorShiftDto);
  }

  async findAll(): Promise<DoctorShift[]> {
    return this.doctorShiftRepository.findAll();
  }

  async findOne(doctorId: string, shiftId: string): Promise<DoctorShift> {
    const doctorShift = await this.doctorShiftRepository.findOne(doctorId, shiftId);
    if (!doctorShift) {
      throw new NotFoundException(`DoctorShift with doctor ID "${doctorId}" and shift ID "${shiftId}" not found`);
    }
    return doctorShift;
  }

  async update(
    doctorId: string,
    shiftId: string,
    updateDoctorShiftDto: UpdateDoctorShiftDto,
  ): Promise<DoctorShift> {
    const existingDoctorShift = await this.doctorShiftRepository.findOne(doctorId, shiftId);
    if (!existingDoctorShift) {
      throw new NotFoundException(`DoctorShift with doctor ID "${doctorId}" and shift ID "${shiftId}" not found`);
    }
    await this.doctorShiftRepository.update(doctorId, shiftId, updateDoctorShiftDto);
    return this.findOne(doctorId, updateDoctorShiftDto.shiftId);
  }

  async remove(doctorId: string, shiftId: string): Promise<{ message: string }> {
    const existingDoctorShift = await this.doctorShiftRepository.findOne(doctorId, shiftId);
    if (!existingDoctorShift) {
      throw new NotFoundException(`DoctorShift with doctor ID "${doctorId}" and shift ID "${shiftId}" not found`);
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
    const data = await this.doctorShiftRepository.findByDoctorIdWithTimeFilter(doctorId, startDate, endDate);
    
    return plainToInstance(DoctorShiftScheduleDto, data, {
      excludeExtraneousValues: true,
    });
  }
}