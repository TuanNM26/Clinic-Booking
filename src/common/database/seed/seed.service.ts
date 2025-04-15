import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RoleSeeder ,UserSeeder} from './index';
import { ShiftSeeder } from './shift.seed';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly roleSeeder: RoleSeeder,
    private readonly userSeeder: UserSeeder,   
    private readonly shiftSeeder: ShiftSeeder,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seed();
  }

  async seed(): Promise<void> {
    // await this.roleSeeder.seed();
    // await this.userSeeder.seed();
    // await this.shiftSeeder.seed();
  }
}