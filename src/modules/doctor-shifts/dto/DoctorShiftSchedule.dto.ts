import { Expose, Type } from 'class-transformer';

export class ShiftDto {
  @Expose() date: string;
  @Expose() start_time: string;
  @Expose() end_time: string;
  @Expose() status: string;
  @Expose() id: string;
}

export class DoctorShiftScheduleDto {
  @Expose() date: string;
  @Expose()
  @Type(() => ShiftDto)
  shift: ShiftDto;
}
