import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Shift } from '../../shifts/entities/shift.entity';
import { Specialization } from '../../specializations/entities/specialization.entity';
import { BaseEntity } from 'src/common/database/base.entity';
import { AppointmentStatus } from 'src/common/enum/status.enum';

@Entity('appointments')
export class Appointment extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column()
  email: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  address: string;

  @Column({ name: 'identity_number' })
  identity_number: string;

  @Column()
  doctor_id: string;

  @ManyToOne(() => User, user => user.appointments)
  @JoinColumn({ name: 'doctor_id' })
  doctor: User;

  @Column()
  shift_id: string;

  @ManyToOne(() => Shift, shift => shift.appointments)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  @Column()
  specialized_id: string;

  @ManyToOne(() => Specialization, specialization => specialization.appointments)
  @JoinColumn({ name: 'specialized_id' })
  specialized: Specialization;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus; 


  @Column({ type: 'timestamp' })
  appointment_date: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
