import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsDate,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { AppointmentStatus } from 'src/common/enum/status.enum';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dob?: Date;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  identity_number?: string;

  @IsOptional()
  @IsString()
  doctor_id?: string;

  @IsOptional()
  @IsString()
  shift_id?: string;

  @IsOptional()
  @IsString()
  specialized_id?: string;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  appointment_date?: Date;

  @IsNotEmpty()
  @IsString()
  start_time: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
