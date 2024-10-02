import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { Model } from 'mongoose';
import * as fs from 'fs';
import { Course } from '../src/course/course.entity';
import { SeederModule } from './SeederModule';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);

  const courseModel = app.get<Model<Course>>('CourseModel');

  const data = fs.readFileSync('./scripts/courses_data.json', 'utf-8');
  const courses = JSON.parse(data);

  try {
    await courseModel.insertMany(courses);
    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
