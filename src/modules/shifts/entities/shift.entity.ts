import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DoctorShift } from '../../doctor-shifts/entities/doctor-shift.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('shifts')
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({ type: 'enum', enum: ['available', 'booked', 'completed'], default: 'available' })
  status: 'available' | 'booked' | 'completed';

  @OneToMany(() => DoctorShift, ds => ds.shift)
  doctorShifts: DoctorShift[];

  @OneToMany(() => Appointment, appointment => appointment.shift)
  appointments: Appointment[];
}
