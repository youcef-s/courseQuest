import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course extends Document {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  instructor: string;

  @Prop({ required: true })
  schedule: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
