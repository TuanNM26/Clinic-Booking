import { forwardRef, Module } from '@nestjs/common';
import  AuthService  from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../../modules/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [forwardRef(() => UsersModule), ConfigModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
