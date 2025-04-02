import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Doctor } from '../doctors/doctor.entity';
import { Service } from '../services/service.entity';
import { BaseEntity } from '../database/base.entity';

@Entity('doctor_services')
export class DoctorService extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Doctor, (doctor) => doctor.id)
    doctor: Doctor;

    @ManyToOne(() => Service, (service) => service.id)
    service: Service;
}