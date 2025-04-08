import { Module } from '@nestjs/common';
import { Mail-historyService } from './mail-history.service';
import { Mail-historyController } from './mail-history.controller';

@Module({
  controllers: [Mail-historyController],
  providers: [Mail-historyService],
})
export class Mail-historyModule {}