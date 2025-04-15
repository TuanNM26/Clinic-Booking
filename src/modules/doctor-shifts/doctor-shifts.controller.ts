import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { DoctorShiftsService } from './services/doctor-shifts.service';
import { CreateDoctorShiftDto } from './dto/create-doctor-shift.dto';
import { UpdateDoctorShiftDto } from './dto/update-doctor-shift.dto';
import { DoctorShift } from './entities/doctor-shift.entity';
import { Auth } from 'src/common/decorator/auth.decorator';
import { CurrentUser } from 'src/common/decorator/currentUser.decorator';
import { User } from '../users/entities/user.entity';
import { Permission } from 'src/common/enum/permission.enum';
import { DoctorShiftDto } from './dto/response.doctorShift.dto';


@Controller('doctor-shifts')
export class DoctorShiftsController {
  constructor(private readonly doctorShiftsService: DoctorShiftsService) {}

  @Post()
  @Auth([`${Permission.HEAD_DOCTOR_REGISTER_SHIFT}`]) 
  @UsePipes(new ValidationPipe())
  create(@Body() createDoctorShiftDto: CreateDoctorShiftDto) {
    return this.doctorShiftsService.create(createDoctorShiftDto);
  }

  @Post('register')
  @Auth([`${Permission.REGISTER_SHIFT}`]) 
  @UsePipes(new ValidationPipe())
  registerDoctorShift(
  @Body('shiftId') shiftId: string, 
  @CurrentUser() user: any          
  ) {
  const createDoctorShiftDto = new CreateDoctorShiftDto();
  createDoctorShiftDto.shiftId = shiftId;
  createDoctorShiftDto.doctorId = user.sub; 

  return this.doctorShiftsService.create(createDoctorShiftDto);
  }


  @Get()
  @Auth([`${Permission.GET_ALL_DOCTOR_SHIFT}`]) 
  findAll() {
    return this.doctorShiftsService.findAll();
  }

  @Get(':doctorId/:shiftId')
  findOne(@Param('doctorId') doctorId: string, @Param('shiftId') shiftId: string) {
    console.log(doctorId + ' tach ra ni oi ' + shiftId)
    return this.doctorShiftsService.findOne(doctorId, shiftId);
  }

  @Put(':doctorId/:shiftId')
  @UsePipes(new ValidationPipe())
  async update(
      @Param('doctorId') doctorId: string,
      @Param('shiftId') shiftId: string,
      @Body() updateDoctorShiftDto: UpdateDoctorShiftDto,
    ): Promise<DoctorShiftDto> {
      return this.doctorShiftsService.update(doctorId, shiftId, updateDoctorShiftDto);
  }

  @Delete(':doctorId/:shiftId')
  @HttpCode(HttpStatus.OK)
  @Auth([`${Permission.UNREGISTER_SHIFT}`]) 
  remove(@Param('doctorId') doctorId: string, @Param('shiftId') shiftId: string) {
    return this.doctorShiftsService.remove(doctorId, shiftId);
  }

  @Get('my-schedule')
  @Auth() 
  getMySchedule(
  @CurrentUser() user: any,
  @Query('startDate') startDate?: string,
  @Query('endDate') endDate?: string,
) {
  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;
  return this.doctorShiftsService.getScheduleByDoctorIdWithFilter(user.sub, start, end);
}

@Get(':doctorId')
@Auth()
getDoctorSchedule(
  @Param('doctorId') doctorId: string,
  @Query('startDate') startDate?: string,
  @Query('endDate') endDate?: string,
) {
  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;
  return this.doctorShiftsService.getScheduleByDoctorIdWithFilter(doctorId, start, end);
}

}