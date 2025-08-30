import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { CourseService } from './course.service';
import {
  CreateCourseRequest,
  UpdateCourseRequest,
  CourseResponse,
} from 'src/model/course.model';
import { WebResponse } from 'src/model/web.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Course')
@Controller('course')
@UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  @HttpCode(201)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  async create(
    @Body() request: CreateCourseRequest,
  ): Promise<WebResponse<CourseResponse>> {
    await this.courseService.create(request);
    return {
      success: true,
      message: 'Course created successfully',
    };
  }

  @Get()
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Courses retrieved successfully' })
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ): Promise<WebResponse<any>> {
    const result = await this.courseService.getAll(
      Number(page),
      Number(limit),
      search,
    );
    return {
      success: true,
      message: 'Courses retrieved successfully',
      data: result.data,
      pagination: result.pagination,
    };
  }

  @Get(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get course by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Course retrieved successfully' })
  async getById(@Param('id') id: string): Promise<WebResponse<CourseResponse>> {
    const result = await this.courseService.getById(id);
    return {
      success: true,
      message: 'Course retrieved successfully',
      data: result,
    };
  }

  @Put(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update course by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Course updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() request: UpdateCourseRequest,
  ): Promise<WebResponse<CourseResponse>> {
    const result = await this.courseService.update(id, request);
    return {
      success: true,
      message: 'Course updated successfully',
      data: result,
    };
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete course by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Course deleted successfully' })
  async delete(@Param('id') id: string): Promise<WebResponse<void>> {
    await this.courseService.delete(id);
    return {
      success: true,
      message: 'Course deleted successfully',
    };
  }
}
