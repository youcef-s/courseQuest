import { Injectable } from '@nestjs/common';
import { Course, CourseDocument } from './course.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) { }

  async findAll() {
    return await this.courseModel.find().exec();
  }
}
