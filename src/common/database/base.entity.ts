import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  @Exclude()
  createdAt: Date;

  @Column({ nullable: true })
  @Exclude()
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp' })
  @Exclude()
  updatedAt: Date;

  @Column({ nullable: true })
  @Exclude()
  updatedBy: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  @Exclude()
  deletedAt?: Date;

  @Column({ nullable: true })
  @Exclude()
  deletedBy?: string;
}
