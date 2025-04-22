import { DataSource } from 'typeorm';
import { Role } from '../../../modules/roles/entities/role.entity';
import * as fs from 'fs';
import * as path from 'path';

export const seedRoles = async (dataSource: DataSource): Promise<void> => {
  const roleRepository = dataSource.getRepository(Role);

  const filePath = path.resolve(__dirname, '../seed/data/role.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const roles = JSON.parse(rawData);

  for (const role of roles) {
    const exists = await roleRepository.findOne({ where: { name: role.name } });
    if (!exists) {
      const newRole = roleRepository.create(role);
      await roleRepository.save(newRole);
    }
  }

  console.log('✅ Roles seeded successfully.');
};
