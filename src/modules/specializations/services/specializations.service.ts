import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecializationDto } from '../dto/create-specialization.dto';
import { UpdateSpecializationDto } from '../dto/update-specialization.dto';
import { SpecializationRepository } from '../repositories/specializations.repository';
import { Specialization } from '../entities/specialization.entity';
import { SpecializationDto } from '../dto/response.specialization.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SpecializationsService {
  constructor(
    private readonly specializationRepository: SpecializationRepository,
  ) {}

  async create(
    createSpecializationDto: CreateSpecializationDto,
  ): Promise<Specialization> {
    const existingSpecialization =
      await this.specializationRepository.findByName(
        createSpecializationDto.name,
      );
    if (existingSpecialization) {
      throw new Error(
        `Specialization with name "${createSpecializationDto.name}" already exists`,
      );
    }
    return this.specializationRepository.create(createSpecializationDto);
  }

  async findAll(): Promise<SpecializationDto[]> {
    const specializations = await this.specializationRepository.findAll();
    return plainToInstance(SpecializationDto, specializations, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<SpecializationDto> {
    const specialization = await this.specializationRepository.findOne(id);
    if (!specialization) {
      return null;
    }
    return plainToInstance(SpecializationDto, specialization, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    updateSpecializationDto: UpdateSpecializationDto,
  ): Promise<SpecializationDto> {
    const specialization = await this.specializationRepository.findOne(id);
    if (!specialization) {
      throw new NotFoundException(`Specialization with ID "${id}" not found`);
    }
    const updatedSpecialization = await this.specializationRepository.update(
      id,
      updateSpecializationDto,
    );
    if (!updatedSpecialization) {
      throw new Error(`Failed to update specialization with ID "${id}"`);
    }
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const specialization = await this.specializationRepository.findOne(id);
    if (!specialization) {
      throw new NotFoundException(`Specialization with ID "${id}" not found`);
    }
    await this.specializationRepository.remove(id);
  }

  async findByName(name: string): Promise<SpecializationDto> {
    const specialization = await this.specializationRepository.findByName(name);
    if (!specialization) {
      throw new NotFoundException(
        `Specialization with name "${name}" not found`,
      );
    }
    return plainToInstance(SpecializationDto, specialization, {
      excludeExtraneousValues: true,
    });
  }
}
