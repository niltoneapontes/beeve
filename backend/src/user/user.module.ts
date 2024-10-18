import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersRepositoryImpl } from './user.repository.impl';

@Module({
  providers: [UserService, UsersRepositoryImpl],
  controllers: [UserController],
})
export class UserModule {}
