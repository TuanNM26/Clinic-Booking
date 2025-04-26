import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/common/decorator/auth.decorator';
import { CurrentUser } from 'src/common/decorator/currentUser.decorator';
import { User } from './entities/user.entity';
import { Permission } from 'src/common/enum/permission.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post()
   @Auth([`${Permission.CREATE_USER}`]) 
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('getAll')
  @Auth([`${Permission.GET_ALL_USERS}`]) 
  findAll()
   {
    return this.usersService.findAll();
  }

  @Get('role/doctor')
  getDoctors() {
  return this.usersService.findUsersByRole('Doctor');
  }


  @Get(':id')
  @Auth([`${Permission.GET_ALL_USERS}`]) 
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get()
  @Auth()
  getProfiles(@CurrentUser() user : User) {
    return this.usersService.findOne(user.id);
  }

  @Get('specialization/:specialization')
  getDoctorBySpecializtion(@Param('specialization') specialization : string){
    return this.usersService.findUserBySpecialization(specialization);
  }

  @Put(':id')
  @Auth([`${Permission.UPDATE_USER}`]) 
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Auth([`${Permission.UPDATE_USER}`]) 
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
