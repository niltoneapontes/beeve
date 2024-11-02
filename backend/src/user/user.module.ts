import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersRepositoryImpl } from './user.repository.impl';
import { UsersRepository } from './user.repository';
import { PrismaService } from 'database/prisma.service';

@Module({
  providers: [
    PrismaService,
    UserService,
    {
      provide: UsersRepository,
      useClass: UsersRepositoryImpl,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
