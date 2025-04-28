import { IsString } from 'class-validator';

export class CancelShiftDto {
  @IsString()
  reason: string;
}
