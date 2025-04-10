import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDoctorShiftDto {
  @IsNotEmpty()
  @IsString()
  doctorId: string;

  @IsNotEmpty()
  @IsString()
  shiftId: string;
}