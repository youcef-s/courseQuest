import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return await this.authService.login(body);
  }

  @Post('signup')
  async signup(@Body() body: UserDto) {
    return await this.authService.signup(body);
  }
}
