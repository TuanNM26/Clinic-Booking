import { Expose } from 'class-transformer';

export class ResponseShiftDto {
  @Expose()
  id: string;

  @Expose()
  date: string;

  @Expose()
  start_time: string;

  @Expose()
  end_time: string;
}