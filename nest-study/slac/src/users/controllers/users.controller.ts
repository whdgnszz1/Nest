import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { JoinRequestDto } from '../dto/join.request.dto';
import { UsersService } from '../services/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Req() req: Request) {
    return req.user;
  }

  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    this.usersService.postUsers(data.email, data.nickname, data.password);
  }

  @Post('login')
  logIn() {
    return req.user;
  }

  @Post('logout')
  logOut(@Req() req: Request, @Res() res: Response) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
