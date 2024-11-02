import { Module } from '@nestjs/common';
import { BeverageService } from './beverage.service';
import { BeverageController } from './beverage.controller';
import { BeveragesRepositoryImpl } from './beverage.repository.impl';
import { BeveragesRepository } from './beverage.repository';
import { PrismaService } from 'database/prisma.service';

@Module({
  providers: [
    PrismaService,
    BeverageService,
    {
      provide: BeveragesRepository,
      useClass: BeveragesRepositoryImpl,
    },
  ],
  controllers: [BeverageController],
})
export class BeverageModule {}
