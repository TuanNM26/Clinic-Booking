import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from '../doctors/doctor.entity';
import { BaseEntity } from '../database/base.entity';

@Entity('shifts')
export class Shift extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Doctor)
    doctor: Doctor;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'time' })
    start_time: string;

    @Column({ type: 'time' })
    end_time: string;

    @Column({ type: 'enum', enum: ['available', 'booked', 'completed'], default: 'available' })
    status: string;
}