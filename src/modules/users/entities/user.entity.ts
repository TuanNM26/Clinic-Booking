import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Specialization } from '../../specializations/entities/specialization.entity';
import { DoctorShift } from '../../doctor-shifts/entities/doctor-shift.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { BaseEntity } from '../../../common/database/base.entity';

@Entity('users')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  identify_number: string;


  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  specialization_id: string;

  @ManyToOne(() => Specialization, specialization => specialization.users)
  @JoinColumn({ name: 'specialization_id' })
  specialization: Specialization;

  @Column()
  role_id: string;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 0 })
  experience_years: number;

  @OneToMany(() => DoctorShift, ds => ds.doctor)
  doctorShifts: DoctorShift[];

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];
}
