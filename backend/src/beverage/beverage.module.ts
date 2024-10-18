import { Module } from '@nestjs/common';
import { BeverageService } from './beverage.service';
import { BeverageController } from './beverage.controller';
import { BeveragesRepositoryImpl } from './beverage.repository.impl';

@Module({
  providers: [BeverageService, BeveragesRepositoryImpl],
  controllers: [BeverageController],
})
export class BeverageModule {}
