import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CourseDto } from './course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.courseService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: CourseDto) {
    return await this.courseService.create(body);
  }

}
