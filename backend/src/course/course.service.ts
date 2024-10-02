import { BadRequestException, Injectable } from '@nestjs/common';
import { Course, CourseDocument } from './course.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseDto } from './course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) { }

  async findAll() {
    return await this.courseModel.find().exec();
  }

  async create(course: CourseDto) {
    const coursedb = await this.courseModel.findOne({ title: course.title });
    if (coursedb) {
      throw new BadRequestException('Course already exists');
    }
    const newCourse = new this.courseModel(course);
    return await newCourse.save();
  }
}
