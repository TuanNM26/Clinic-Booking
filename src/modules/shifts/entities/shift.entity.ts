import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DoctorShift } from '../../doctor-shifts/entities/doctor-shift.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { BaseEntity } from '../../../common/database/base.entity';

@Entity('shifts')
export class Shift extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @OneToMany(() => DoctorShift, (ds) => ds.shift)
  doctorShifts: DoctorShift[];

  @OneToMany(() => Appointment, (appointment) => appointment.shift)
  appointments: Appointment[];
}
