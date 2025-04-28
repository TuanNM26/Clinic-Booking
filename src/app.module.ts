import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';

import { User } from './modules/users/entities/user.entity';
import { DoctorShift } from './modules/doctor-shifts/entities/doctor-shift.entity';
import { Permission } from './modules/permissions/entities/permission.entity';
// import { RolePermission } from './modules/role-permissions/entities/role-permission.entity';
import { Role } from './modules/roles/entities/role.entity';
import { Shift } from './modules/shifts/entities/shift.entity';
import { Specialization } from './modules/specializations/entities/specialization.entity';
import { Appointment } from './modules/appointments/entities/appointment.entity';
import { AuthModule } from './common/auth/auth.module';
import { SpecializationsModule } from './modules/specializations/specializations.module';
import { ShiftsModule } from './modules/shifts/shifts.module';
import { PermissionModule } from './common/guards/permission.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { DoctorShiftsModule } from './modules/doctor-shifts/doctor-shifts.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './modules/mails/mail.module';
// import { SeederModule } from './common/database/seed/seed.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './modules/cron/cron.service';
import { CronModule } from './modules/cron/cron.module';
import { BullModule } from '@nestjs/bull';

const envPath = path.join(__dirname, './configs/.env-dev');
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, './configs/common/configs/.env-dev'), 
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      autoLoadEntities: true,
      entities: [
        User, 
        Role, 
        DoctorShift, Permission,  
        Shift,
        Appointment,Specialization
      ],
      synchronize: false,
      migrations: [path.join(__dirname, 'migrations', '*.{js,ts}')],
      migrationsRun: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: configService.get<boolean>('MAIL_SECURE'), 
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        tls: {
          rejectUnauthorized: false, 
        },
        defaults: {
          from: `${configService.get<string>('MAIL_FROM')}`,
        },
        template: {
          dir: path.join(__dirname, 'common', 'templates'),
          adapter: new HandlebarsAdapter(), 
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    MailModule,
    UsersModule,
    RolesModule,
    AuthModule,
    SpecializationsModule,
    ShiftsModule,
    PermissionsModule,
    DoctorShiftsModule,
    AppointmentsModule,
    // SeederModule,
    CronModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}