import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeverageModule } from './beverage/beverage.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'auth/constants';

@Module({
  imports: [
    BeverageModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10,
          limit: 30,
        },
      ],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '604800s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
