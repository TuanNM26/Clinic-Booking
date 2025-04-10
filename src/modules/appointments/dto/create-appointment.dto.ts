// create-appointment.dto.ts
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsDate, IsEnum } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date) // ✅ thêm dòng này
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

  @IsNotEmpty()
  @IsString()
  doctor_id: string;

  @IsNotEmpty()
  @IsString()
  shift_id: string;

  @IsNotEmpty()
  @IsString()
  specialized_id: string;

  @IsOptional()
  @IsEnum(['pending', 'confirmed', 'cancelled', 'completed'])
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  appointment_date?: Date;

  @IsOptional()
  @IsString()
  notes?: string;
}