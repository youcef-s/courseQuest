import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(pass, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Incorrect password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }

  async login(user: { username: string; password: string }) {
    const userdb: any = await this.userService.findOne(user.username);
    const payload = { username: userdb.username, sub: userdb._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: any) {
    const userdb: any = await this.userService.findOne(user.username);
    if (userdb) {
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const createdUser: any = await this.userService.createUser(user);
    const payload = { username: createdUser.username, sub: createdUser._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
