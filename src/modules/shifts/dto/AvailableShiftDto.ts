import { Expose, Type } from 'class-transformer';

export class DoctorInfo {
  @Expose()
  full_name: string;

  @Expose()
  email: string;
}

export class AvailableShiftDto {
  @Expose()
  id: string;

  @Expose()
  date: string;

  @Expose()
  start_time: string;

  @Expose()
  end_time: string;

  @Expose()
  status: string;

  @Expose()
  @Type(() => DoctorInfo)
  doctor: DoctorInfo;
}
