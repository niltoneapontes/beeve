import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import {
  BeverageDeleteQueryDTO,
  BeverageDTO,
  BeverageQueryDTO,
} from './beverage.dto';
import { Response } from 'express';
import { BeverageService } from './beverage.service';
import { Counter } from 'prom-client';

@Controller('beverages')
export class BeverageController {
  constructor(private beverageService: BeverageService) {}

  counterSuccess = new Counter({
    name: 'http_requests_beverages_success',
    help: 'Contagem de requests para o controller de bebidas',
  });

  counterFailed = new Counter({
    name: 'http_requests_beverages_failed',
    help: 'Contagem de requests para o controller de bebidas',
  });

  @Post()
  async createBeverage(@Body() body: BeverageDTO, @Res() res: Response) {
    try {
      const result = await this.beverageService.createBeverage(body);
      this.counterSuccess.inc();
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      this.counterFailed.inc();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'An error has occurred',
        details: error.stack || error,
      });
    }
  }

  @Put()
  async editBeverage(@Body() body: BeverageDTO, @Res() res: Response) {
    try {
      const result = await this.beverageService.editBeverage(body);
      this.counterSuccess.inc();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      this.counterFailed.inc();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'An error has occurred',
        details: error.stack || error,
      });
    }
  }

  @Get()
  async getBeverages(@Query() query: BeverageQueryDTO, @Res() res: Response) {
    try {
      const userIdInt = parseInt(query.userId);
      const result = await this.beverageService.findBeveragesByUser(userIdInt);
      this.counterSuccess.inc();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      this.counterFailed.inc();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'An error has occurred',
        details: error.stack || error,
      });
    }
  }

  @Delete()
  async deleteBeverages(
    @Query() query: BeverageDeleteQueryDTO,
    @Res() res: Response,
  ) {
    try {
      const idInt = parseInt(query.id);
      await this.beverageService.deleteBeverage(idInt);
      this.counterSuccess.inc();
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      this.counterFailed.inc();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'An error has occurred',
        details: error.stack || error,
      });
    }
  }
}
