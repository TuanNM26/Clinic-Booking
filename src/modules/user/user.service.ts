import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './user.dto/createUser.dto';
import { UpdateUserDto } from './user.dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  getAll() {
    return this.userRepo.findAll();
  }

  findOne(id: string) {
    return this.userRepo.findById(id);
  }

  findByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }

  async register(data: CreateUserDto): Promise<User> {
    const existing = await this.findByEmail(data.email);
    if (existing) throw new Error('Email already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepo.createUser({
      ...data,
      dob: new Date(data.dob),
      password: hashedPassword,
    });    
    return this.userRepo.saveUser(user);  
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const existing = await this.findOne(id);
    if (!existing) throw new NotFoundException('User not found');
    const updatedData = {
      ...data,
      dob: data.dob ? new Date(data.dob) : undefined,
    };
    await this.userRepo.updateUser(id, updatedData);
    return this.findOne(id);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepo.softDelete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');
  }
}
