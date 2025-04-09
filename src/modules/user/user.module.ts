import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { AuthModule } from '../../auth/auth.module'; // ✅ Import AuthModule
import { Role } from '../role/role.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]), 
    // forwardRef(() => AuthModule), // ✅ Dùng forwardRef để tránh vòng lặp
  ],
  providers: [UserService,UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
