import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorShiftsService } from './doctor-shifts.service';
import { CreateDoctorShiftDto } from './dto/create-doctor-shift.dto';
import { UpdateDoctorShiftDto } from './dto/update-doctor-shift.dto';

@Controller('doctor-shifts')
export class DoctorShiftsController {
  constructor(private readonly doctorShiftsService: DoctorShiftsService) {}

  @Post()
  create(@Body() createDoctorShiftDto: CreateDoctorShiftDto) {
    return this.doctorShiftsService.create(createDoctorShiftDto);
  }

  @Get()
  findAll() {
    return this.doctorShiftsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorShiftsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorShiftDto: UpdateDoctorShiftDto) {
    return this.doctorShiftsService.update(+id, updateDoctorShiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorShiftsService.remove(+id);
  }
}
