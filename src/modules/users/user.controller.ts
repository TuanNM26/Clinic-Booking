import { Controller, Get, Param, UseGuards, Req,Post,Body } from '@nestjs/common';
import { UserService } from './user.service';
// import { AuthGuard } from '../../guards/authGuards';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return req.user;
  }

  @Post('register')
  async register(@Body() body: {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    dob: string;
    roleId: string;
  }) {
    return this.userService.register(body);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
