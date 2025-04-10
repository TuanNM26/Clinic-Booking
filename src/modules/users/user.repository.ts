import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  createUser(dto: CreateUserDto): Promise<User> {
    const user = this.repository.create(dto);
    return this.repository.save(user);
  }

  getAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  getUserById(id: string): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  getByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    await this.repository.update(id, dto);
    return this.getUserById(id);
  }

  deleteUser(id: string): Promise<void> {
    return this.repository.delete(id).then(() => undefined);
  }

  findByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }
}
