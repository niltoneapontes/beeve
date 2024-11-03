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
import { observabilityMethods } from 'observability/methods';

@Controller('beverages')
export class BeverageController {
  constructor(private beverageService: BeverageService) {}

  @Post()
  async createBeverage(@Body() body: BeverageDTO, @Res() res: Response) {
    const end = observabilityMethods.beveragesPostResponseTime.startTimer();
    try {
      const result = await this.beverageService.createBeverage(body);
      observabilityMethods.counterBeverageSuccess.inc();
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      observabilityMethods.counterBeverageFailed.inc();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'An error has occurred',
        details: error.stack || error,
      });
    } finally {
      end();
    }
  }

  @Put()
  async editBeverage(@Body() body: BeverageDTO, @Res() res: Response) {
    const end = observabilityMethods.beveragesPutResponseTime.startTimer();
    try {
      const result = await this.beverageService.editBeverage(body);
      observabilityMethods.counterBeverageSuccess.inc();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      observabilityMethods.counterBeverageFailed.inc();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'An error has occurred',
        details: error.stack || error,
      });
    } finally {
      end();
    }
  }

  @Get()
  async getBeverages(@Query() query: BeverageQueryDTO, @Res() res: Response) {
    const end = observabilityMethods.beveragesGetResponseTime.startTimer();
    try {
      const userIdInt = parseInt(query.userId);
      const result = await this.beverageService.findBeveragesByUser(userIdInt);
      observabilityMethods.counterBeverageSuccess.inc();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      observabilityMethods.counterBeverageFailed.inc();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'An error has occurred',
        details: error.stack || error,
      });
    } finally {
      end();
    }
  }

  @Delete()
  async deleteBeverages(
    @Query() query: BeverageDeleteQueryDTO,
    @Res() res: Response,
  ) {
    const end = observabilityMethods.beveragesDeleteResponseTime.startTimer();
    try {
      const idInt = parseInt(query.id);
      await this.beverageService.deleteBeverage(idInt);
      observabilityMethods.counterBeverageSuccess.inc();
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      observabilityMethods.counterBeverageFailed.inc();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'An error has occurred',
        details: error.stack || error,
      });
    } finally {
      end();
    }
  }
}
