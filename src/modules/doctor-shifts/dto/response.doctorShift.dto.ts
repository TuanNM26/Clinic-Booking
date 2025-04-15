// src/modules/doctor-shifts/dto/doctor-shift.dto.ts
import { Expose } from 'class-transformer';

export class DoctorShiftDto {
  @Expose()
  doctor_id: string;

  @Expose()
  shift_id: string;

  @Expose()
  assigned_at: Date;
}