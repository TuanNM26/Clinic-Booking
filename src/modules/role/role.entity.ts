import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { BaseEntity } from '../database/base.entity';

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, length: 50 })
    name: string;

    @Column('text')
    description: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}