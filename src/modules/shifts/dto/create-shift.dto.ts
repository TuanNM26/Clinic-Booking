// src/modules/shifts/dto/create-shift.dto.ts
import { IsNotEmpty, IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class CreateShiftDto {
  @IsNotEmpty()
  @IsString()
  start_time: string; // Đổi thành snake_case

  @IsNotEmpty()
  @IsString()
  end_time: string;   // Đổi thành snake_case
}