import { Expose, Type } from 'class-transformer';

export class AppointmentResponseDto {
  @Expose()
  id: string;

  @Expose()
  full_name: string;

  @Expose()
  phone_number?: string;

  @Expose()
  email?: string;

  @Expose()
  dob?: Date;

  @Expose()
  gender?: string;

  @Expose()
  address?: string;

  @Expose()
  identity_number?: string;

  @Expose()
  doctor_id: string;

  @Expose()
  shift_id: string;

  @Expose()
  specialized_id: string;

  @Expose()
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';

  @Expose()
  appointment_date?: Date;

  @Expose()
  start_time?: string;

  @Expose()
  notes?: string;
}