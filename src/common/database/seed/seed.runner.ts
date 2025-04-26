import { AppDataSource } from '.././data-source'; // Đảm bảo đường dẫn chính xác
import { seedPermissions, seedRoles, seedRolePermissions, seedUsers } from './index';

const runSeeder = async () => {
  try {
    await AppDataSource.initialize();
    
    // Seed permissions first
    console.log('Seeding permissions...');
    await seedPermissions(AppDataSource);
    
    // Then seed roles
    console.log('Seeding roles...');
    await seedRoles(AppDataSource);
    
    // Then seed role-permissions
    console.log('Seeding role-permissions...');
    await seedRolePermissions(AppDataSource);
    
    // Then seed users
    console.log('Seeding users...');
    await seedUsers(AppDataSource);
    
    console.log('✅ All seeds completed successfully!');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error running seeder:', error);
  }
};

runSeeder();
