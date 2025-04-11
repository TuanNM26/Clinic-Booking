import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { DoctorShift } from './entities/doctor-shift.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorShiftDto } from './dto/create-doctor-shift.dto';
import { UpdateDoctorShiftDto } from './dto/update-doctor-shift.dto';

@Injectable()
export class DoctorShiftRepository {
  constructor(
    @InjectRepository(DoctorShift)
    private readonly doctorShiftRepository: Repository<DoctorShift>,
  ) {}

  async create(createDoctorShiftDto: CreateDoctorShiftDto): Promise<DoctorShift> {
    const doctorShift = this.doctorShiftRepository.create({
      doctor_id: createDoctorShiftDto.doctorId, // Map DTO property to entity property
      shift_id: createDoctorShiftDto.shiftId,   // Map DTO property to entity property
      // Các thuộc tính khác của DoctorShift nếu có và được cung cấp trong DTO
    });
    return await this.doctorShiftRepository.save(doctorShift);
  }

  async findAll(): Promise<DoctorShift[]> {
    return await this.doctorShiftRepository.find();
  }

  async findOne(doctorId : string , shiftId : string) : Promise<DoctorShift | null> {
       try {
        const result = this.doctorShiftRepository.createQueryBuilder('doctor_shift')
        .where('doctor_Shift.doctor_id = :doctorId' , { doctorId})
        .andWhere('doctor_shift.shift_id = :shiftid', {shiftId})
        .getOne();
        return result
       }
       catch (error){
        return null
       }
  }
  
  async update(
    doctorId: string,
    shiftId: string,
    updateDoctorShiftDto: UpdateDoctorShiftDto,
  ): Promise<DoctorShift> {
    const existingDoctorShift = await this.findOne(doctorId, shiftId); 

    const updateResult: UpdateResult = await this.doctorShiftRepository.update(
      { doctor_id: doctorId, shift_id: shiftId },
      { shift_id: updateDoctorShiftDto.shiftId },
    );

    if (updateResult.affected === 0) {
      throw new Error();
    }


    const newlyUpdated = await this.findOne(doctorId, updateDoctorShiftDto.shiftId);
    return newlyUpdated;
  }

  async remove(doctorId: string, shiftId: string): Promise<void> {
    await this.doctorShiftRepository.softDelete({ doctor_id: doctorId, shift_id: shiftId });
  }

  async findByDoctorIdWithTimeFilter(doctorId: string,startDate?: Date,endDate?: Date,): Promise<DoctorShift[]> {
    const query = this.doctorShiftRepository
      .createQueryBuilder('doctor_shift')
      .leftJoinAndSelect('doctor_shift.doctor', 'doctor')
      .leftJoinAndSelect('doctor_shift.shift', 'shift')
      .where('doctor.id = :doctorId', { doctorId });
  
    if (startDate) {
      query.andWhere('shift.start_time >= :startDate', { startDate });
    }
  
    if (endDate) {
      query.andWhere('shift.end_time <= :endDate', { endDate });
    }
  
    return await query.orderBy('shift.start_time', 'ASC').getMany();
  }
  
  
}