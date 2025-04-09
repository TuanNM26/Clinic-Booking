import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  createUser(data: Partial<User>) {
    return this.repo.create(data);
  }

  saveUser(user: User) {
    return this.repo.save(user);
  }

  updateUser(id: string, data: Partial<User>) {
    return this.repo.update(id, data);
  }

  softDelete(id: string) {
    return this.repo.softDelete(id);
  }
}
