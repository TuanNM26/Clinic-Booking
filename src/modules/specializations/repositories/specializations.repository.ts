import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Specialization } from '../entities/specialization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSpecializationDto } from '../dto';
import { CreateSpecializationDto } from '../dto';

@Injectable()
export class SpecializationRepository {
  constructor(
    @InjectRepository(Specialization)
    private readonly specializationRepository: Repository<Specialization>,
  ) {}

  async create(createSpecializationDto: CreateSpecializationDto): Promise<Specialization> {
    const specialization = this.specializationRepository.create(createSpecializationDto);
    return await this.specializationRepository.save(specialization);
  }

  async findAll(): Promise<Specialization[]> {
    return await this.specializationRepository.find();
  }

  async findOne(id: string): Promise<Specialization | null> {
    return await this.specializationRepository.findOneBy({ id });
  }

  async findByName(name: string): Promise<Specialization | null> {
    return await this.specializationRepository.findOneBy({ name });
  }

  async update(id: string, updateSpecializationDto: UpdateSpecializationDto): Promise<Specialization | null> {
    await this.specializationRepository.update(id, updateSpecializationDto);
    return await this.specializationRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.specializationRepository.softDelete(id);
  }
}