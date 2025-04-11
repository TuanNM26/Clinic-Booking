import { Module } from '@nestjs/common';
import { ShiftsService } from './services/shifts.service';
import { ShiftsController } from './shifts.controller';
import { ShiftRepository } from './repositories/shifts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shift])],
  controllers: [ShiftsController],
  providers: [ShiftsService,ShiftRepository],
  exports: [ShiftsService]
})
export class ShiftsModule {}
