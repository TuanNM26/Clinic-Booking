import { DataSource } from 'typeorm';
import { Role } from '../../../modules/roles/entities/role.entity';
import { Permission } from '../../../modules/permissions/entities/permission.entity';

export const seedRolePermissions = async (dataSource: DataSource): Promise<void> => {
  const roleRepository = dataSource.getRepository(Role);
  const permissionRepository = dataSource.getRepository(Permission);

  // Find admin role with its current permissions
  const adminRole = await roleRepository.findOne({ 
    where: { name: 'admin' },
    relations: ['permissions']
  });
  
  if (!adminRole) {
    console.log('❌ Admin role not found');
    return;
  }

  // Get all permissions
  const allPermissions = await permissionRepository.find();
  
  // Get current permission IDs that admin role has
  const currentPermissionIds = adminRole.permissions.map(p => p.id);
  
  // Find new permissions that admin role doesn't have yet
  const newPermissions = allPermissions.filter(
    permission => !currentPermissionIds.includes(permission.id)
  );

  if (newPermissions.length === 0) {
    console.log('✅ No new permissions to assign to admin role');
    return;
  }

  // Add new permissions to admin role
  adminRole.permissions = [...adminRole.permissions, ...newPermissions];
  await roleRepository.save(adminRole);

  console.log(`✅ ${newPermissions.length} new permissions assigned to admin role successfully.`);
}; 