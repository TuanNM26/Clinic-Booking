import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BaseService<T extends ObjectLiteral> {
  constructor(protected readonly repo: Repository<T>) {}

  async getAll(): Promise<T[]> {
    return this.repo.find();
  }

  async getById(id: string): Promise<T> {
    const entity = await this.repo.findOne({ where: { id } as any });
    if (!entity) throw new NotFoundException(`Entity with ID ${id} not found`);
    return entity;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: string, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repo.update(id, data);
    return this.getById(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
  }
}
