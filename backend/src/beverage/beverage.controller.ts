import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  BeverageDeleteQueryDTO,
  BeverageDTO,
  BeverageQueryDTO,
} from './beverage.dto';
import { Response } from 'express';
import { BeverageService } from './beverage.service';
import { observabilityMethods } from 'observability/methods';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { AuthGuard } from 'auth/auth.guard';

@Controller('beverages')
export class BeverageController {
  constructor(private beverageService: BeverageService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Post('/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const newFileName = `${randomUUID().toString()}-${file.originalname.toLowerCase().replaceAll(' ', '')}`;
      await this.beverageService.uploadImage(newFileName, file.buffer);
      const url = `https://beeve-beverages.s3.us-east-1.amazonaws.com/${newFileName}`;

      return res.status(HttpStatus.CREATED).json({
        url: url,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'An error has occurred',
        details: error.stack || error,
      });
    }
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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
