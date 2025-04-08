import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { BaseEntity } from '../database/base.entity';

@Entity('user_notification_settings')
export class UserNotificationSetting extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    user: User;

    @Column({ length: 255 })
    email: string;

    @Column({ default: false })
    is_primary: boolean;

    @Column({ default: true })
    receive_notifications: boolean;
}