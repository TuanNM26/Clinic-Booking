import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

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
        User, 
        Role, 
        DoctorShift, Permission,  
        Shift,
        Appointment,Specialization
      ],
      synchronize: false,
      migrations: ['dist/common/migrations/*.js'],
      migrationsRun: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    SpecializationsModule,
    ShiftsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

