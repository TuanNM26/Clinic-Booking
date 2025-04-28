import { DataSource } from 'typeorm';
import { Role } from '../../../modules/roles/entities/role.entity';
import { Permission } from '../../../modules/permissions/entities/permission.entity';
import * as fs from 'fs';
import * as path from 'path';

export const seedRolePermissions = async (dataSource: DataSource): Promise<void> => {
  const roleRepository = dataSource.getRepository(Role);
  const permissionRepository = dataSource.getRepository(Permission);

  const filePath = path.resolve(__dirname, '../seed/data/role-permissions.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const rolePermissions = JSON.parse(rawData);

  for (const rolePermission of rolePermissions) {
    const { roleId, permissionId } = rolePermission;

    const role = await roleRepository.findOne({ 
      where: { id: roleId },
      relations: ['permissions'] 
    });
    
    const permission = await permissionRepository.findOne({ 
      where: { name: permissionId }
    });

    if (role && permission) {
      const permissionExists = role.permissions.some(p => p.name === permissionId);
      
      if (!permissionExists) {
        role.permissions = [...role.permissions, permission];
        await roleRepository.save(role);
      }
    }
  }

  console.log('✅ Role-Permission seeded successfully.');
};
