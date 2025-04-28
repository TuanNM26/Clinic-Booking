import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Shift } from '../../shifts/entities/shift.entity';
import { BaseEntity } from '../../../common/database/base.entity';
import { DoctorShiftStatus } from '../../../common/enum/doctorShift.status.enum';

@Entity('doctor_shifts')
export class DoctorShift extends BaseEntity {
  @PrimaryColumn()
  doctor_id: string;

  @PrimaryColumn()
  shift_id: string;

  @PrimaryColumn({ type: 'date' })
  date: Date;

  @Column({
    type: 'enum',
    enum: DoctorShiftStatus,
    default: DoctorShiftStatus.ACTIVE,
  })
  status: DoctorShiftStatus;

  @ManyToOne(() => User, (user) => user.doctorShifts)
  @JoinColumn({ name: 'doctor_id' })
  doctor: User;

  @ManyToOne(() => Shift, (shift) => shift.doctorShifts)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  assigned_at: Date;
}
