import { Controller, Post, Body } from '@nestjs/common';
import AuthService  from './auth.service';
import { LoginDto } from './dto/LoginDTO';
import { RefreshTokenDto } from './dto/RefreshDTO';

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
}
