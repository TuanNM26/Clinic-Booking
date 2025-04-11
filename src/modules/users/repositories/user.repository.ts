import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Specialization } from '../../specializations/entities/specialization.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  findUserBySpecialization(specialization: string) {
    return this.repository.find({
      where : { specialization_id : specialization  },
      relations : ['specialization']
    });
  }

  createUser(dto: CreateUserDto): Promise<User> {
    const user = this.repository.create(dto);
    return this.repository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.repository.find({
      relations: ['role', 'specialization'], 
    });
  }
  
  async getUserById(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['role', 'specialization'], 
    });
  }
  
  async findUsersByRole(roleName: string): Promise<User[]> {
    return this.repository.find({
      where: {
        role: { name: roleName },
      },
      relations: ['role','specialization'],
    });
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
