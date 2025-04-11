import { IsNotEmpty, IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class CreateShiftDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsOptional() 
  @IsEnum(['available', 'booked', 'completed'])
  status?: 'available' | 'booked' | 'completed';
}