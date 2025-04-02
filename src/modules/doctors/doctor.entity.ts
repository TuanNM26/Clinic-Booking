import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { BaseEntity } from '../database/base.entity';

@Entity('doctors')
export class Doctor extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    user: User;

    @Column({ length: 255 })
    specialty: string;

    @Column('text')
    description: string;

    @Column({ default: 0 })
    experience_years: number;
}
