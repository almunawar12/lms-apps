import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import {
  CreateCourseRequest,
  UpdateCourseRequest,
  CourseResponse,
} from 'src/model/course.model';

@Injectable()
export class CourseService {
  constructor(private prismaService: PrismaService) {}

  async create(request: CreateCourseRequest): Promise<CourseResponse> {
    const instructor = await this.prismaService.user.findUnique({
      where: { id: request.instructorId },
    });

    if (!instructor) {
      throw new HttpException('Instructor not found', 404);
    }

    const course = await this.prismaService.course.create({
      data: {
        title: request.title,
        description: request.description,
        instructorId: request.instructorId,
        startDate: new Date(request.startDate),
      },
    });
    return this.toResponse(course);
  }

  async getAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ): Promise<{ data: CourseResponse[]; pagination: any }> {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        }
      : {};

    const [courses, total] = await this.prismaService.$transaction([
      this.prismaService.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          instructor: true,
        },
      }),
      this.prismaService.course.count({ where }),
    ]);

    return {
      data: courses.map(this.toResponse),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string): Promise<CourseResponse> {
    const course = await this.prismaService.course.findUnique({
      where: { id },
    });
    if (!course) throw new HttpException('Course not found', 404);
    return this.toResponse(course);
  }

  async update(
    id: string,
    request: UpdateCourseRequest,
  ): Promise<CourseResponse> {
    const course = await this.prismaService.course.findUnique({
      where: { id },
    });
    if (!course) throw new HttpException('Course not found', 404);
    const updated = await this.prismaService.course.update({
      where: { id },
      data: {
        title: request.title,
        description: request.description,
        instructorId: request.instructorId,
        startDate: request.startDate,
      },
    });
    return this.toResponse(updated);
  }

  async delete(id: string): Promise<void> {
    const course = await this.prismaService.course.findUnique({
      where: { id },
    });
    if (!course) throw new HttpException('Course not found', 404);
    await this.prismaService.course.delete({ where: { id } });
  }

  private toResponse(course: any): CourseResponse {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      instructorId: course.instructorId,
      instructorName: course.instructor?.name,
      startDate: course.startDate,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };
  }
}
