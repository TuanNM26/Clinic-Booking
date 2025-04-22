import { DataSource } from 'typeorm';
import { Permission } from '../../../modules/permissions/entities/permission.entity';
import * as fs from 'fs';
import * as path from 'path';

export const seedPermissions = async (dataSource: DataSource): Promise<void> => {
  const permissionRepository = dataSource.getRepository(Permission);

  const filePath = path.resolve(__dirname, '../seed/data/permission.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const permissions = JSON.parse(rawData);

  for (const perm of permissions) {
    const exists = await permissionRepository.findOne({ where: { name: perm.name } });
    if (!exists) {
      const newPermission = permissionRepository.create(perm);
      await permissionRepository.save(newPermission);
    }
  }

  console.log('✅ Permissions seeded successfully.');
};
