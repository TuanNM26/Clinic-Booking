import { Expose } from 'class-transformer';

export class SpecializationDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;
}