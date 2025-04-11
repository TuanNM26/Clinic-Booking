import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, Put, Req } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { AppointmentResponseDto } from './dto/response-appointment.dto';
import { CurrentUser } from 'src/common/decorator/currentUser.decorator';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<AppointmentResponseDto> {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll(@Query() query): Promise<Appointment[]> {
    return this.appointmentsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentsService.findOne(id);
  }

  @Get('status/:id')
  async getAppointmentStatus(@Param('id') id: string) {
  return this.appointmentsService.getStatus(id);
  }

  @Get('doctor/appointments')
  async getDoctorAppointments(@Query() query: any, @CurrentUser() doctor: any): Promise<Appointment[]> {
    return this.appointmentsService.findAllForDoctor(query, doctor.id);
  }

  // Endpoint mới 2: GET /doctor/appointments/:id (Chi tiết lịch hẹn của bác sĩ - Yêu cầu token)
  @Get('doctor/appointments/:id')
  async getDoctorAppointmentById(@Param('id') id: string, @CurrentUser() doctor: any): Promise<Appointment> {
    return this.appointmentsService.findOneForDoctor(id, doctor.id);
    
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.appointmentsService.remove(id);
  }

 


}