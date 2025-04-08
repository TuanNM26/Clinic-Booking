// src/database/data-source.ts

import { DataSource } from 'typeorm';
import * as path from 'path';
import { config } from 'dotenv';
import * as dotenv from 'dotenv';

const envPath2 = path.resolve(__dirname, '../../configs/common/configs/.env-dev');
dotenv.config({ path: envPath2 });

import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { Doctor } from '../doctor/doctor.entity';
import { Service } from '../service/service.entity';
import { DoctorService } from '../doctorServices/doctor-services.entity';
import { Shift } from '../shift/shifts.entity';
import { Appointment } from '../appointment/appointments.entity';
import { UserNotificationSetting } from '../user-notification-setting/users.notification-setting.entity';
import { MailHistory } from '../mail-history/mail-history.entity';

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
    Doctor,
    Service,
    DoctorService,
    Shift,
    Appointment,
    UserNotificationSetting,
    MailHistory,
  ],
  synchronize: false,
  migrations: ['dist/common/migrations/*{.ts,.js'], 
  migrationsRun: true,
});
