import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../../modules/roles/entities/role.entity';

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async seed(): Promise<void> {
    const roles = [
      { name: 'Admin' },
      { name: 'Doctor' },
      { name: 'Patient' },
      { name: 'Nurse'}
    ];

    for (const roleData of roles) {
      const existingRole = await this.roleRepository.findOne({ where: { name: roleData.name } });
      if (!existingRole) {
        await this.roleRepository.save(roleData);
      }
    }

    console.log('Role data seeded!');
  }
}