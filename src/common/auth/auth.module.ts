// import { Module, forwardRef } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { UserModule } from '../modules/users/user.module'; // Import UserModule
// import { AuthGuard } from '../guards/authGuards'; // Import AuthGuard
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { ConfigModule } from '@nestjs/config';

// @Module({
//   imports: [
//     ConfigModule,
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.register({
//       secret: process.env.JWT_SECRET, 
//       signOptions: { expiresIn: '1h' }, 
//     }),
//     forwardRef(() => UserModule), // ✅ Import UserModule bằng forwardRef để tránh vòng lặp
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, AuthGuard], // ✅ Cung cấp AuthService & AuthGuard
//   exports: [AuthService, AuthGuard], // ✅ Export để UserModule có thể sử dụng
// })
// export class AuthModule {}
