import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, Put, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
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
import { Response } from 'express';
import { AppointmentStatisticsDto } from './dto/appointment-statistics.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<AppointmentResponseDto> {
    const shiftId = await this.appointmentsService.getShiftIdByTime(createAppointmentDto.doctor_id, createAppointmentDto.start_time);
  
  createAppointmentDto.shift_id = shiftId;
  console.log(shiftId);
  return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @Auth([`${Permission.GET_ALL_APPOINTMENTS}`]) 
  findAll(@Query() query): Promise<Appointment[]> {
    return this.appointmentsService.findAll(query);
  }

  @Get('statistics')
  @Auth([`${Permission.SHOW_APPOINTMENT_STATISTIC}`]) 
  async getStatistics() {
    return this.appointmentsService.getAppointmentStatistics();
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
  async getDoctorAppointments(@Query() query: any, @CurrentUser() doctor: any): Promise<AppointmentResponseDto[]> {
    return this.appointmentsService.findAllForDoctor(query, doctor.sub);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Patch('status/confirm/:id')
  @Auth([`${Permission.CHANGE_APPOINTMENT_STATUS}`]) 
  @UsePipes(new ValidationPipe())
  async ConfirmAppointmentStatus(
    @Param('id') id: string,
    @Body() updateAppointmentStatusDto: UpdateAppointmentStatusDto,
  ): Promise<Appointment> {
    updateAppointmentStatusDto.status = AppointmentStatus.CONFIRMED;
    return this.appointmentsService.updateAppointmentStatus(id, updateAppointmentStatusDto.status);
  }

  @Patch('status/cancel/:id')
  @Auth([`${Permission.CHANGE_APPOINTMENT_STATUS}`]) 
  @UsePipes(new ValidationPipe())
  async CancelAppointmentStatus(
    @Param('id') id: string,
    @Body() updateAppointmentStatusDto: UpdateAppointmentStatusDto,
  ): Promise<Appointment> {
    updateAppointmentStatusDto.status = AppointmentStatus.CANCELLED;
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
  
  @Get('status/:action/:appointmentId')
  async redirectToPatch(
    @Param('action') action: string,
    @Param('appointmentId') id: string,
    // @Res() res: Response,
    @Res({ passthrough: false }) res: Response,
  ) {
    if (!['confirm', 'cancel'].includes(action)) {
      throw new HttpException('Hành động không hợp lệ', HttpStatus.BAD_REQUEST);
    }

    try {
      // Gọi PATCH nội bộ thông qua service
      if (action === 'confirm') {
        console.log("oke lich nhe")
        await this.appointmentsService.updateAppointmentStatus(id, AppointmentStatus.CONFIRMED);
      } else if (action === 'cancel') {
        console.log("huy lich nhe")
        await this.appointmentsService.updateAppointmentStatus(id, AppointmentStatus.CANCELLED);
      }

      res.setHeader('Content-Type', 'text/html');
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <title>Kết quả xử lý</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 50px;
              background-color: #f7f7f7;
            }
            .message {
              display: inline-block;
              padding: 20px 30px;
              border-radius: 8px;
              background-color: ${action === 'confirm' ? '#d4edda' : '#f8d7da'};
              color: ${action === 'confirm' ? '#155724' : '#721c24'};
              border: 1px solid ${action === 'confirm' ? '#c3e6cb' : '#f5c6cb'};
            }
          </style>
        </head>
        <body>
          <div class="message">
            <h2>Lịch hẹn đã được ${action === 'confirm' ? 'duyệt' : 'hủy'} thành công!</h2>
            <p>Bạn có thể đóng cửa sổ này.</p>
          </div>
        </body>
        </html>
      `);
    } catch (err) {
      console.error(err);
    }
  }
}