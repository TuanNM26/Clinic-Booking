import { IsOptional, IsString } from 'class-validator';

export class UpdateDoctorShiftDto {
  @IsOptional()
  @IsString()
  doctorId?: string;

  @IsOptional()
  @IsString()
  shiftId?: string;
}