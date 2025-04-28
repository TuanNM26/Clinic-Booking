import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { BaseEntity } from '../../../common/database/base.entity';

@Entity('specializations')
export class Specialization extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => User, (user) => user.specialization)
  users: User[];

  @OneToMany(() => Appointment, (appointment) => appointment.specialized)
  appointments: Appointment[];
}
