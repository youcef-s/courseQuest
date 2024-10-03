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

  async findAll(page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;
    const totalCourses = await this.courseModel.countDocuments().exec();
    const total = Math.ceil(totalCourses / limit);
    const courses = await this.courseModel
      .find()
      .sort({ title: 1 })
      .skip(offset)
      .limit(limit)
      .exec();
    return {
      total,
      courses,
    };
  }

  async create(course: CourseDto) {
    const coursedb = await this.courseModel.findOne({ title: course.title });
    if (coursedb) {
      throw new BadRequestException('Course already exists');
    }
    const newCourse = new this.courseModel(course);
    return await newCourse.save();
  }

  async search(title: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const courses = await this.courseModel
      .find({ $text: { $search: title } })
      .sort({ score: { $meta: 'textScore' } })
      .select({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.courseModel.countDocuments({
      $text: { $search: title },
    });

    return {
      courses,
      total: Math.ceil(total / limit),
    };
  }
}
