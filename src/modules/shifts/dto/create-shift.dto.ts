import { IsNotEmpty, IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class CreateShiftDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsOptional() // Trường này không bắt buộc khi tạo mới (có thể có giá trị mặc định)
  @IsEnum(['available', 'booked', 'completed'])
  status?: 'available' | 'booked' | 'completed';
}