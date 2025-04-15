import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from '../../../modules/shifts/entities/shift.entity';

@Injectable()
export class ShiftSeeder {
  constructor(
    @InjectRepository(Shift)
    private shiftRepository: Repository<Shift>,
  ) {}

  async seed(): Promise<void> {
    const now = new Date();
    const startOfWeek = new Date(now);
    const dayOfWeek = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const shiftsToSeed: Shift[] = [];
    const shiftTimes = ['08:00', '11:00', '14:00']; // Các giờ bắt đầu ca làm việc

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      const formattedDate = currentDate.toISOString().split('T')[0];

      for (const startTime of shiftTimes) {
        let endTime: string;
        const [startHour, startMinute] = startTime.split(':').map(Number);

        // Tính giờ kết thúc (ví dụ: mỗi ca 3 tiếng)
        const endHour = startHour + 3;
        endTime = `${String(endHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;

        // Đảm bảo giờ kết thúc không vượt quá cuối ngày làm việc (ví dụ: 17:00)
        if (endHour <= 17) {
          shiftsToSeed.push(
            this.shiftRepository.create({
              start_time: startTime,
              end_time: endTime,
            }),
          );
        }
      }
    }

    for (const shift of shiftsToSeed) {
      const existingShift = await this.shiftRepository.findOne({
        // where: { date: shift.date, start_time: shift.start_time },
      });
      if (!existingShift) {
        await this.shiftRepository.save(shift);
      }
    }

    console.log('Shift data seeded successfully for the current week with smaller shifts!');
  }
}