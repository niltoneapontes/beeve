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

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body: UserDTO, @Res() res: Response) {
    try {
      const result = await this.userService.createUser(body);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  @Put()
  async editUser(@Body() body: UserDTO, @Res() res: Response) {
    try {
      const result = await this.userService.editUser(body);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  @Delete()
  async deleteUser(@Query() query: UserDeleteQueryDTO, @Res() res: Response) {
    try {
      const result = await this.userService.deleteUser(query.id);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
