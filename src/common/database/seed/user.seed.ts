import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../modules/users/entities/user.entity'; // Đường dẫn đến entity User của bạn
import { Role } from '../../../modules/roles/entities/role.entity'; // Đường dẫn đến entity Role của bạn

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async seed(): Promise<void> {
    const adminRole = await this.roleRepository.findOne({ where: { name: 'Admin' } });

    if (adminRole) {
      const users = [
        { username: 'admin', password: 'password', role: adminRole },
        { username: 'doctor1', password: 'password', role: adminRole }, // Giả sử Doctor cũng có role Admin cho mục đích demo
      ];

      for (const userData of users) {
        const existingUser = await this.userRepository.findOne({ where: { username: userData.username } });
        if (!existingUser) {
          await this.userRepository.save(userData);
        }
      }

      console.log('User data seeded!');
    } else {
      console.warn('Admin role not found, cannot seed users.');
    }
  }
}