import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateDoctorShiftDto {
  @IsNotEmpty()
  @IsString()
  doctorId?: string;

  @IsNotEmpty()
  @IsString()
  shiftId: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}