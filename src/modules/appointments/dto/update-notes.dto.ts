import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAppointmentNotesDto {
  @IsNotEmpty()
  @IsString()
  notes: string;
}
