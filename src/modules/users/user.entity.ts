import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from '../roles/role.entity';
import { BaseEntity } from '../database/base.entity';
@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ unique: true, nullable: true, length: 255 })
    email: string;

    @Column({ length: 512 })
    password: string;

    @Column({ length: 20 })
    phone_number: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ type: 'date' })
    dob: Date;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
}