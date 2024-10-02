import { Get, Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async gerProfile(@Req() req: Request) {
    return this.userService.findOne(req.user['username']);
  }

  @Post()
  async createUser(@Body() userDto: UserDto) {
    await this.userService.createUser(userDto);
    return 'User created successfully';
  }
}
