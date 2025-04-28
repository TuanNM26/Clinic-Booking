import { AppDataSource } from '.././data-source';
import { seedPermissions, seedRoles, seedRolePermissions, seedUsers } from './index';

const runSeeder = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Seeding permissions...');
    await seedPermissions(AppDataSource);
    
    console.log('Seeding roles...');
    await seedRoles(AppDataSource);
    
    console.log('Seeding role-permissions...');
    await seedRolePermissions(AppDataSource);
    
    console.log('Seeding users...');
    await seedUsers(AppDataSource);
    
    console.log('✅ All seeds completed successfully!');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error running seeder:', error);
  }
};

runSeeder();
