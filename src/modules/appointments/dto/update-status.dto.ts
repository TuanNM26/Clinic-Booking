import { IsEnum, IsNotEmpty } from 'class-validator';
import { AppointmentStatus } from '../../../common/enum/status.enum';

export class UpdateAppointmentStatusDto {
  @IsNotEmpty()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}
