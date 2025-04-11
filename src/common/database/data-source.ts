

import { DataSource } from 'typeorm';
import * as path from 'path';
import { config } from 'dotenv';
import * as dotenv from 'dotenv';

const envPath2 = path.resolve(__dirname, '../../configs/common/configs/.env-dev');
dotenv.config({ path: envPath2 });

import { User } from '../../modules/users/entities/user.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { DoctorShift } from 'src/modules/doctor-shifts/entities/doctor-shift.entity';
import { Specialization } from 'src/modules/specializations/entities/specialization.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { Shift } from 'src/modules/shifts/entities/shift.entity';



export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_NAME || 'clinic_db',
  entities: [
    User,
    Role,
    DoctorShift,
    Permission,
    Specialization,
    Shift,
    Appointment,
  ],
  synchronize: false,
  migrations: ['dist/migrations/**/*.{ts,js}'], 
  migrationsRun: true,
});
