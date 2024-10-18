import { Module } from '@nestjs/common';
import { BeverageService } from './beverage.service';
import { BeverageController } from './beverage.controller';

@Module({
  providers: [BeverageService],
  controllers: [BeverageController],
})
export class BeverageModule {}
