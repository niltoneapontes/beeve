import { Body, Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { register } from 'prom-client';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/metrics')
  async getMetrics(@Body() req: any, @Res() res: Response) {
    try {
      res.set('Content-Type', register.contentType);
      res.status(HttpStatus.OK).end(await register.metrics());
    } catch (ex) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
