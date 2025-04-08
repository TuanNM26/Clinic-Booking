import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Doctor } from '../doctor/doctor.entity';
import { Service } from '../service/service.entity';
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