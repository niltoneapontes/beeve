import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { BeverageDTO, BeverageQueryDTO } from './beverage.dto';
import { BeveragesRepository } from './beverage.repository';

@Controller('beverage')
export class BeverageController {
  constructor(private bubbleMembersRepository: BeveragesRepository) {}

  @Post()
  async createBeverage(@Body() body: BeverageDTO) {}

  @Put()
  async editBeverage(@Body() body: BeverageDTO) {}

  @Get()
  async getBeverages(@Query() query: BeverageQueryDTO) {}
}
