import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { DoctorShift } from '../entities/doctor-shift.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorShiftDto } from '../dto/create-doctor-shift.dto';
import { UpdateDoctorShiftDto } from '../dto/update-doctor-shift.dto';
import { Shift } from 'src/modules/shifts/entities/shift.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class DoctorShiftRepository {
  constructor(
    @InjectRepository(DoctorShift)
    private readonly doctorShiftRepository: Repository<DoctorShift>,
  ) {}

  async create(createDoctorShiftDto: CreateDoctorShiftDto): Promise<DoctorShift> {
    const { doctorId, shiftId, date } = createDoctorShiftDto; // Lấy date từ DTO

    const shift = await this.doctorShiftRepository.manager.findOne(Shift, {
      where: { id: shiftId },
    });

    if (!shift) {
      throw new NotFoundException('Ca làm không tồn tại.');
    }

    const today = new Date();
    const shiftDate = new Date(date);
    if (shiftDate < new Date(today.setHours(0, 0, 0, 0))) {
      throw new BadRequestException('Không thể đăng ký ca làm trong quá khứ.');
    }

    const doctor = await this.doctorShiftRepository.manager.findOne(User, {
      where: { id: doctorId },
    });

    if (!doctor || !doctor.is_active) {
      throw new BadRequestException('Bác sĩ không tồn tại hoặc đã ngưng hoạt động.');
    }

    const conflict = await this.doctorShiftRepository
      .createQueryBuilder('doctor_shift')
      .innerJoin('doctor_shift.shift', 's')
      .where('doctor_shift.doctor_id = :doctorId', { doctorId })
      .andWhere('doctor_shift.date = :shiftDate', { shiftDate: date }) 
      .andWhere(':startTime < s.end_time AND :endTime > s.start_time', {
        startTime: shift.start_time,
        endTime: shift.end_time,
      })
      .getOne();

    if (conflict) {
      throw new BadRequestException('Bác sĩ đã có ca làm trùng thời gian trong ngày này.');
    }

    const doctorShift = this.doctorShiftRepository.create({
      doctor_id: doctorId,
      shift_id: shiftId,
      date: shiftDate, 
    });

    return await this.doctorShiftRepository.save(doctorShift);
  }

  async findAll(): Promise<DoctorShift[]> {
    return await this.doctorShiftRepository.find();
  }

  async findOne(doctorId: string, shiftId: string): Promise<DoctorShift | null> {
    try {
      return await this.doctorShiftRepository.findOne({
        where: {
          doctor_id: doctorId,
          shift_id: shiftId,
        },
      });
    } catch (error) {
      console.error('Error finding DoctorShift:', error);
      throw error; 
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