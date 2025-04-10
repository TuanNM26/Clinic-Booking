import { Module } from '@nestjs/common';
import { SpecializationsService } from './specializations.service';
import { SpecializationsController } from './specializations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialization } from './entities/specialization.entity';
import { SpecializationRepository } from './specializations.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Specialization])],
  controllers: [SpecializationsController],
  providers: [SpecializationsService, SpecializationRepository],
  exports: [SpecializationsService, SpecializationRepository],
})
export class SpecializationsModule {}
