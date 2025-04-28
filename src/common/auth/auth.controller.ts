import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import AuthService from './auth.service';
import { LoginDto } from './dto/LoginDTO';
import { RefreshTokenDto } from './dto/RefreshDTO';
import { CurrentUser } from '../decorator/currentUser.decorator';
import { User } from 'src/modules/users/entities/user.entity';
import { Auth } from '../decorator/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto);
  }
  @Post('refresh-token')
  async refreshToken(@Body() refreshDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshDto.refresh_token);
  }
  @Get()
  @Auth()
  async getMe(@CurrentUser() user: User) {
    return user;
  }
}
