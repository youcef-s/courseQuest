import { IsString, IsNotEmpty } from 'class-validator';

export class CourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  instructor: string;

  @IsString()
  @IsNotEmpty()
  schedule: string;
}
