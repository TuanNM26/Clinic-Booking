import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
// import { AuthModule } from './auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';

// Import các entity
import { User } from './modules/users/user.entity';
import { Role } from './modules/roles/role.entity';
import { Doctor } from './modules/doctors/doctor.entity';
import { Service } from './modules/services/service.entity';
import { DoctorService } from './modules/doctorServices/doctor-services.entity';
import { Shift } from './modules/shifts/shifts.entity';
import { Appointment } from './modules/appointments/appointments.entity';
import { MailHistory } from './modules/mail-history/mail-history.entity';
import { UserNotificationSetting } from './modules/user-notification-settings/users.notification-setting.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, './configs/.env-dev'), 
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      autoLoadEntities: true,
      entities: [
        User, Role, Doctor, Service, DoctorService, Shift,
        Appointment, MailHistory, UserNotificationSetting
      ],
      synchronize: false,
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
    }),

    // AuthModule,
    UserModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

