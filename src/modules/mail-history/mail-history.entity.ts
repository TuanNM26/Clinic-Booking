import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { BaseEntity } from '../database/base.entity';

export enum MailStatus {
    PENDING = 'pending',
    SENT = 'sent',
    FAILED = 'failed',
}

@Entity('mail_history')
export class MailHistory extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { nullable: false })
    user: User;

    @Column({ length: 255 })
    receiver_email: string;

    @Column({ length: 255 })
    subject: string;

    @Column('text')
    content: string;

    @Column({ type: 'enum', enum: MailStatus, default: MailStatus.PENDING })
    status: MailStatus;

    @Column('text', { nullable: true })
    error_message: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    send_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
