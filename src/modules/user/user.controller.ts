import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto/createUser.dto';
import { UpdateUserDto } from './user.dto/updateUser.dto'; // tạo nếu cần
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.register(body);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.register(body); // có thể tách riêng nếu cần
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
