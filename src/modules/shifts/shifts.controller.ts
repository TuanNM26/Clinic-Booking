import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftsService.create(createShiftDto);
  }

  @Get('all')
  findAll() {
    return this.shiftsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.shiftsService.update(id, updateShiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shiftsService.remove(id);
  }

 
  @Get()
  async getAvailableShifts(
  @Query('specialization_id') specializationId: string,
  @Query('doctor_id') doctorId : string,
  @Query('date') date: string,
) {
  return this.shiftsService.getAvailableShifts(specializationId,doctorId ,date);
}


}
