import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
// import { AuthModule } from './auth/auth.module';
import { RoleModule } from './modules/role/role.module';

// Import các entity
import { User } from './modules/user/user.entity';
import { Role } from './modules/role/role.entity';
import { Doctor } from './modules/doctor/doctor.entity';
import { Service } from './modules/service/service.entity';
import { DoctorService } from './modules/doctorServices/doctor-services.entity';
import { Shift } from './modules/shift/shifts.entity';
import { Appointment } from './modules/appointment/appointments.entity';
import { MailHistory } from './modules/mail-history/mail-history.entity';
import { UserNotificationSetting } from './modules/user-notification-setting/users.notification-setting.entity';
import { AuthGuardModule } from './common/guards/authGuard.module';
import { AuthModule } from './common/auth/auth.module';

const envPath = path.join(__dirname, './configs/.env-dev');
console.log('✅ envFilePath:', envPath); // 👈 log ra để kiểm tra
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, './configs/common/configs/.env-dev'), 
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
      migrations: ['dist/common/migrations/*.js'],
      migrationsRun: true,
    }),

    // AuthModule,
    UserModule,
    RoleModule,
    AuthGuardModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

