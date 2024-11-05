import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserDeleteQueryDTO, UserDTO } from './user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { observabilityMethods } from 'observability/methods';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async createUser(@Body() body: UserDTO, @Res() res: Response) {
    const end = observabilityMethods.usersPostResponseTime.startTimer();
    try {
      const result = await this.userService.createUser(body);
      observabilityMethods.counterSuccess.inc();

      const payload = { sub: result.id };
      const access_token = await this.jwtService.signAsync(payload);

      return res
        .status(HttpStatus.CREATED)
        .json({ ...result, access_token: access_token });
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

  @Post('/login')
  async loginUser(
    @Body() body: Pick<UserDTO, 'email' | 'password'>,
    @Res() res: Response,
  ) {
    const end = observabilityMethods.usersPostLoginResponseTime.startTimer();
    try {
      const result = await this.userService.login(body);
      observabilityMethods.counterSuccess.inc();

      const payload = { sub: result.id };
      const access_token = await this.jwtService.signAsync(payload);

      return res
        .status(HttpStatus.OK)
        .json({ ...result, access_token: access_token });
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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
