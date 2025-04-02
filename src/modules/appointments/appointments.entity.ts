import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Doctor } from '../doctors/doctor.entity';
import { Service } from '../services/service.entity';
import { Shift } from '../shifts/shifts.entity';
import { BaseEntity } from '../database/base.entity';

@Entity('appointments')
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Doctor)
    doctor: Doctor;

    @ManyToOne(() => Service)
    service: Service;

    @ManyToOne(() => Shift)
    shift: Shift;

    @Column({ type: 'enum', enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' })
    status: string;

    @Column({ type: 'timestamp' })
    appointment_date: Date;

    @Column('text', { nullable: true })
    notes: string;

    @ManyToOne(() => User, { nullable: true })
    canceled_by: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
