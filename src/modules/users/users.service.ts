import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import AuthService from 'src/common/auth/auth.service';
import { UserResponseDto } from './dto/response.user.dto';
import { plainToInstance } from 'class-transformer';

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

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepo.getAllUsers();
    console.log(users);
    return plainToInstance(UserResponseDto, users, { excludeExtraneousValues: true });
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepo.getUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
  }

  async findUsersByRole(roleName: string): Promise<UserResponseDto[]> {
    const users = await this.usersRepo.findUsersByRole(roleName);
    return plainToInstance(UserResponseDto, users, { excludeExtraneousValues: true });
  }
  

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepo.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    return this.usersRepo.updateUser(id, dto);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    return this.usersRepo.deleteUser(id);
  }

  async findUserBySpecialization(specialization: string) {
    const user = await this.usersRepo.findUserBySpecialization(specialization);
    return user;
  }
}
