import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CourseDto } from './course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return await this.courseService.findAll(pageNumber, limitNumber);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: CourseDto) {
    return await this.courseService.create(body);
  }
}
