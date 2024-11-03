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
import { observabilityMethods } from 'observability/methods';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body: UserDTO, @Res() res: Response) {
    const end = observabilityMethods.usersPostResponseTime.startTimer();
    try {
      const result = await this.userService.createUser(body);
      observabilityMethods.counterSuccess.inc();
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      observabilityMethods.counterFailed.inc();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'An error has occurred',
        details: error.stack || error,
      });
    } finally {
      end();
    }
  }

  @Put()
  async editUser(@Body() body: UserDTO, @Res() res: Response) {
    const end = observabilityMethods.usersPutResponseTime.startTimer();
    try {
      const result = await this.userService.editUser(body);
      observabilityMethods.counterSuccess.inc();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      observabilityMethods.counterFailed.inc();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'An error has occurred',
        details: error.stack || error,
      });
    } finally {
      end();
    }
  }

  @Delete()
  async deleteUser(@Query() query: UserDeleteQueryDTO, @Res() res: Response) {
    const end = observabilityMethods.usersDeleteResponseTime.startTimer();
    const idNumber = parseInt(query.id);
    try {
      await this.userService.deleteUser(idNumber);
      observabilityMethods.counterSuccess.inc();
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      observabilityMethods.counterFailed.inc();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'An error has occurred',
        details: error.stack || error,
      });
    } finally {
      end();
    }
  }
}
