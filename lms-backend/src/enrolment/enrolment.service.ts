import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import {
  CreateEnrolmentRequest,
  UpdateEnrolmentRequest,
  EnrolmentResponse,
} from 'src/model/enrolment.model';

@Injectable()
export class EnrolmentService {
  constructor(private prismaService: PrismaService) {}

  async create(request: CreateEnrolmentRequest): Promise<EnrolmentResponse> {
    // Pastikan user dan course valid
    const user = await this.prismaService.user.findUnique({
      where: { id: request.userId },
    });
    if (!user) throw new HttpException('User not found', 404);
    const course = await this.prismaService.course.findUnique({
      where: { id: request.courseId },
    });
    if (!course) throw new HttpException('Course not found', 404);
    const enrolment = await this.prismaService.enrollment.create({
      data: {
        userId: request.userId,
        courseId: request.courseId,
      },
      include: { user: true, course: true },
    });
    return this.toResponse(enrolment);
  }

  async getAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ): Promise<{ data: EnrolmentResponse[]; pagination: any }> {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [
            { user: { name: { contains: search, mode: 'insensitive' } } },
            { course: { title: { contains: search, mode: 'insensitive' } } },
          ],
        }
      : {};

    const [enrolments, total] = await this.prismaService.$transaction([
      this.prismaService.enrollment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { enrollmentDate: 'desc' },
        include: { user: true, course: true },
      }),
      this.prismaService.enrollment.count({ where }),
    ]);

    return {
      data: enrolments.map(this.toResponse),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string): Promise<EnrolmentResponse> {
    const enrolment = await this.prismaService.enrollment.findUnique({
      where: { id },
      include: { user: true, course: true },
    });
    if (!enrolment) throw new HttpException('Enrolment not found', 404);
    return this.toResponse(enrolment);
  }

  async update(
    id: string,
    request: UpdateEnrolmentRequest,
  ): Promise<EnrolmentResponse> {
    const enrolment = await this.prismaService.enrollment.findUnique({
      where: { id },
    });
    if (!enrolment) throw new HttpException('Enrolment not found', 404);
    // Jika update userId atau courseId, pastikan valid
    if (request.userId) {
      const user = await this.prismaService.user.findUnique({
        where: { id: request.userId },
      });
      if (!user) throw new HttpException('User not found', 404);
    }
    if (request.courseId) {
      const course = await this.prismaService.course.findUnique({
        where: { id: request.courseId },
      });
      if (!course) throw new HttpException('Course not found', 404);
    }
    const updated = await this.prismaService.enrollment.update({
      where: { id },
      data: {
        userId: request.userId,
        courseId: request.courseId,
      },
      include: { user: true, course: true },
    });
    return this.toResponse(updated);
  }

  async delete(id: string): Promise<void> {
    const enrolment = await this.prismaService.enrollment.findUnique({
      where: { id },
    });
    if (!enrolment) throw new HttpException('Enrolment not found', 404);
    await this.prismaService.enrollment.delete({ where: { id } });
  }

  private toResponse(enrolment: any): EnrolmentResponse {
    return {
      id: enrolment.id,
      userId: enrolment.userId,
      userName: enrolment.user?.name,
      courseId: enrolment.courseId,
      courseTitle: enrolment.course?.title,
      enrollmentDate: enrolment.enrollmentDate,
    };
  }
}
