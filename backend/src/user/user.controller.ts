import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { UserDeleteQueryDTO, UserDTO } from './user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { Counter } from 'prom-client';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  counterSuccess = new Counter({
    name: 'http_requests_users_success',
    help: 'Contagem de requests para o controller de usuários',
  });

  counterFailed = new Counter({
    name: 'http_requests_users_failed',
    help: 'Contagem de requests para o controller de usuários',
  });

  @Post()
  async createUser(@Body() body: UserDTO, @Res() res: Response) {
    try {
      const result = await this.userService.createUser(body);
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
  async editUser(@Body() body: UserDTO, @Res() res: Response) {
    try {
      const result = await this.userService.editUser(body);
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
  async deleteUser(@Query() query: UserDeleteQueryDTO, @Res() res: Response) {
    const idNumber = parseInt(query.id);
    try {
      await this.userService.deleteUser(idNumber);
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
