import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorShiftDto } from '../dto/create-doctor-shift.dto';
import { UpdateDoctorShiftDto } from '../dto/update-doctor-shift.dto';
import { DoctorShiftRepository } from '../repositories/doctor-shift.repository';
import { DoctorShift } from '../entities/doctor-shift.entity';
import { plainToInstance } from 'class-transformer';
import { DoctorShiftScheduleDto } from '../dto/DoctorShiftSchedule.dto';
import { DoctorShiftDto } from '../dto/response.doctorShift.dto'; // Đảm bảo import đúng DTO bạn muốn cho response

@Injectable()
export class DoctorShiftsService {
  constructor(private readonly doctorShiftRepository: DoctorShiftRepository) {}

  async create(createDoctorShiftDto: CreateDoctorShiftDto): Promise<DoctorShiftDto> {
    const createdDoctorShift = await this.doctorShiftRepository.create(createDoctorShiftDto);
    return plainToInstance(DoctorShiftDto, createdDoctorShift, { excludeExtraneousValues: true });
  }

  async findAll(): Promise<DoctorShiftDto[]> {
    const doctorShifts = await this.doctorShiftRepository.findAll();
    return plainToInstance(DoctorShiftDto, doctorShifts, { excludeExtraneousValues: true });
  }

  async findOne(doctorId: string, shiftId: string): Promise<DoctorShiftDto> {
    const doctorShift = await this.doctorShiftRepository.findOne(doctorId, shiftId);
    if (!doctorShift) {
      throw new NotFoundException(`DoctorShift with doctor ID "${doctorId}" and shift ID "${shiftId}" not found`);
    }
    return plainToInstance(DoctorShiftDto, doctorShift, { excludeExtraneousValues: true });
  }

  async update(
    doctorId: string,
    shiftId: string,
    updateDoctorShiftDto: UpdateDoctorShiftDto,
  ): Promise<DoctorShiftDto> {
    const existingDoctorShift = await this.doctorShiftRepository.findOne(doctorId, shiftId);
    if (!existingDoctorShift) {
      throw new NotFoundException(`DoctorShift with doctor ID "${doctorId}" and shift ID "${shiftId}" not found`);
    }
    await this.doctorShiftRepository.update(doctorId, shiftId, updateDoctorShiftDto);
    const updatedDoctorShift = await this.findOne(doctorId, updateDoctorShiftDto.shiftId);
    return updatedDoctorShift;
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