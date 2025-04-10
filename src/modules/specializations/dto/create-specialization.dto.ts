import { IsNotEmpty, IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateSpecializationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}