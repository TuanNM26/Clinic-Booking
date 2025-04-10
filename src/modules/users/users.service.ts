import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import AuthService from 'src/common/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository, private authService : AuthService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepo.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const hashedPassword = await this.authService.hashPass(dto.password);
    const userToCreate = { ...dto, password: hashedPassword };

    return this.usersRepo.createUser(userToCreate);
  }

  findAll(): Promise<User[]> {
    return this.usersRepo.getAllUsers();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepo.getUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepo.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findOne(id); // kiểm tra tồn tại trước
    return this.usersRepo.updateUser(id, dto);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    return this.usersRepo.deleteUser(id);
  }
}
