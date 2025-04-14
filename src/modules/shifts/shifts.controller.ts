import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ShiftsService } from './services/shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { Permission } from 'src/common/enum/permission.enum';
import { Auth } from 'src/common/decorator/auth.decorator';

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
  @Auth([`${Permission.GET_SHIFT_DETAIL}`]) 
  findOne(@Param('id') id: string) {
    return this.shiftsService.findOne(id);
  }

  @Put(':id')
  @Auth([`${Permission.UPDATE_SHIFT}`]) 
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.shiftsService.update(id, updateShiftDto);
  }

  @Delete(':id')
  @Auth([`${Permission.DELETE_SHIFT}`]) 
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
