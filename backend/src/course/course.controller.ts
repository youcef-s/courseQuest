import { Controller, Get, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.courseService.findAll();
  }
}
