import { Injectable } from '@nestjs/common';
import { CreateDoctorShiftDto } from './dto/create-doctor-shift.dto';
import { UpdateDoctorShiftDto } from './dto/update-doctor-shift.dto';

@Injectable()
export class DoctorShiftsService {
  create(createDoctorShiftDto: CreateDoctorShiftDto) {
    return 'This action adds a new doctorShift';
  }

  findAll() {
    return `This action returns all doctorShifts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorShift`;
  }

  update(id: number, updateDoctorShiftDto: UpdateDoctorShiftDto) {
    return `This action updates a #${id} doctorShift`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorShift`;
  }
}
