import { Expose, Type } from 'class-transformer';

class RoleInfo {
  @Expose()
  id: string;

  @Expose()
  name: string;
}

class SpecializationInfo {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  phone_number: string;

  @Expose()
  full_name: string;

  @Expose()
  address: string;

  @Expose()
  identify_number: string;

  @Expose()
  dob: Date;

  @Expose()
  gender: string;

  @Expose()
  is_active: boolean;

  @Expose()
  description: string;

  @Expose()
  experience_years: number;

  @Expose()
  @Type(() => RoleInfo)
  role: RoleInfo;

  @Expose()
  @Type(() => SpecializationInfo)
  specialization: SpecializationInfo;
}
