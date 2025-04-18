import { AppDataSource } from '.././data-source'; // Đảm bảo đường dẫn chính xác
import { seedPermissions } from './seed..permission';

const runSeeder = async () => {
  try {
    await AppDataSource.initialize();
    await seedPermissions(AppDataSource);
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error running seeder:', error);
  }
};

runSeeder();
