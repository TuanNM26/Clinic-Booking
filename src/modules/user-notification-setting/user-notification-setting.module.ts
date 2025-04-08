import { Module } from '@nestjs/common';
import { User-notification-settingService } from './user-notification-setting.service';
import { User-notification-settingController } from './user-notification-setting.controller';

@Module({
  controllers: [User-notification-settingController],
  providers: [User-notification-settingService],
})
export class User-notification-settingModule {}