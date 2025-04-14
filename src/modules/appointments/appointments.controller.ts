import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, Put, Req } from '@nestjs/common';
import { AppointmentsService } from './services/appointments.service';
import { CreateAppointmentDto } from './dto';
import { UpdateAppointmentDto } from './dto';
import { Appointment } from './entities/appointment.entity';
import { AppointmentResponseDto } from './dto';
import { CurrentUser } from 'src/common/decorator/currentUser.decorator';
import { User } from '../users/entities/user.entity';
import { Auth } from 'src/common/decorator/auth.decorator';
import { UpdateAppointmentNotesDto } from './dto';
import { UpdateAppointmentStatusDto } from './dto';
import { AppointmentStatus } from 'src/common/enum/status.enum';
import { Permission } from 'src/common/enum/permission.enum';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<AppointmentResponseDto> {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @Auth([`${Permission.GET_ALL_APPOINTMENTS}`]) 
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
  @Auth([`${Permission.GET_APPOINTMENTS}`]) 
  async getDoctorAppointments(@Query() query: any, @CurrentUser() doctor: any): Promise<Appointment[]> {
    return this.appointmentsService.findAllForDoctor(query, doctor.sub);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Patch('status/:id')
  @Auth([`${Permission.CHANGE_APPOINTMENT_STATUS}`]) 
  @UsePipes(new ValidationPipe())
  async updateAppointmentStatus(
    @Param('id') id: string,
    @Body() updateAppointmentStatusDto: UpdateAppointmentStatusDto,
  ): Promise<Appointment> {
    return this.appointmentsService.updateAppointmentStatus(id, updateAppointmentStatusDto.status);
  }

  @Patch('notes/:id')
  @Auth([`${Permission.CHANGE_APPOINTMENT_NOTE}`]) 
  @UsePipes(new ValidationPipe())
  async updateAppointmentNotes(
    @Param('id') id: string,
    @Body() updateAppointmentNotesDto: UpdateAppointmentNotesDto,
  ): Promise<Appointment> {
    return this.appointmentsService.updateAppointmentNotes(id, updateAppointmentNotesDto.notes);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.appointmentsService.remove(id);
  }
}