import { Expose, Transform } from 'class-transformer';

export class DoctorShiftDto {
  @Expose()
  doctor_id: string;

  @Expose()
  shift_id: string;

  @Expose()
  assigned_at: Date;

  @Expose()
  date: Date;

  @Expose()
  @Transform(({ obj }) => obj.shift?.start_time)
  start_time: string;

  @Expose()
  @Transform(({ obj }) => obj.shift?.end_time)
  end_time: string;
}
