import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Shift } from '../../shifts/entities/shift.entity';
import { BaseEntity } from 'src/common/database/base.entity';

@Entity('doctor_shifts')
export class DoctorShift extends BaseEntity{
  @PrimaryColumn()
  doctor_id: string;

  @PrimaryColumn()
  shift_id: string;

  @ManyToOne(() => User, user => user.doctorShifts)
  @JoinColumn({ name: 'doctor_id' })
  doctor: User;

  @ManyToOne(() => Shift, shift => shift.doctorShifts)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  assigned_at: Date;
}
