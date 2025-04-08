import { IsDateString, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  
  @IsNotEmpty()
  @IsString()
  password: string;

  
  @IsNotEmpty()
  @IsString()
  @Length(10, 15)
  phone_number: string;

  
  @IsNotEmpty()
  @IsDateString()
  dob: string;

  
  @IsOptional()
  @IsString()
  email?: string;

  
  @IsOptional()
  @IsString()
  roleId?: string[  ];
}
