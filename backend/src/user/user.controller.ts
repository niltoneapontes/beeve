import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { UserDTO, UserQueryDTO } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private bubbleMembersRepository: UsersRepository) {}

  @Post()
  async createBeverage(@Body() body: UserDTO) {}

  @Put()
  async editBeverage(@Body() body: UserDTO) {}

  @Get()
  async getBeverages(@Query() query: UserQueryDTO) {}
}
