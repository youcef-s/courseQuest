import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username }).select('-password').exec();
  }

  async createUser(userDto: UserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      username: userDto.username,
    });
    if (existingUser) {
      throw new HttpException(
        'Username is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const createdUser = new this.userModel(userDto);
    return await createdUser.save();
  }
}
