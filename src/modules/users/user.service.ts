import { Injectable, ConflictException, BadRequestException   } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';  // ✅ Import Repository từ typeorm
import { User } from './user.entity';
import { Role } from '../roles/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,  // ✅ Dùng Repository<User>
  ) {}

  async register(dto: {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    dob: string;
    roleId: string;
  }): Promise<User> {
    const { name, email, password, phone_number, dob, roleId } = dto;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email đã tồn tại!');
    }

    // Kiểm tra roleId hợp lệ
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new BadRequestException('Role không hợp lệ!');
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      dob: new Date(dob),
      is_active: true,
      role,
    });

    return this.userRepository.save(newUser);
  }
  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<void> {
    await this.userRepository.update(id, userData);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
