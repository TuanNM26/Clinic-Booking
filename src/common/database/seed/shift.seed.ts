import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from '../../../modules/shifts/entities/shift.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ShiftSeeder {
  constructor(
    @InjectRepository(Shift)
    private shiftRepository: Repository<Shift>,
  ) {}

  async seed(): Promise<void> {
    const filePath = path.resolve(__dirname, '../data/shift.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const shifts: Shift[] = JSON.parse(rawData);

    for (const shift of shifts) {
      const existing = await this.shiftRepository.findOne({
        where: { id: shift.id },
      });
      if (!existing) {
        const newShift = this.shiftRepository.create(shift);
        await this.shiftRepository.save(newShift);
      }
    }

    console.log('✅ Shift data seeded from JSON file successfully!');
  }
}
