import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeverageModule } from './beverage/beverage.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BeverageModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
