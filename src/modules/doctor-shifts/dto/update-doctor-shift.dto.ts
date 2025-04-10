import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorShiftDto } from './create-doctor-shift.dto';

export class UpdateDoctorShiftDto extends PartialType(CreateDoctorShiftDto) {}
