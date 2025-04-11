
import { Expose, Type } from 'class-transformer';

export class ShiftDto {
  @Expose() date: string;
  @Expose() start_time: string;
  @Expose() end_time: string;
  @Expose() status: string;
}

export class DoctorShiftScheduleDto {
  @Expose()
  @Type(() => ShiftDto)
  shift: ShiftDto;
}
