import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import {
  CreateModuleRequest,
  UpdateModuleRequest,
  ModuleResponse,
} from 'src/model/module.model';

@Injectable()
export class ModuleService {
  constructor(private prismaService: PrismaService) {}

  async create(request: CreateModuleRequest): Promise<ModuleResponse> {
    const course = await this.prismaService.course.findUnique({
      where: { id: request.courseId },
    });
    if (!course) throw new HttpException('Course not found', 404);
    const module = await this.prismaService.module.create({
      data: {
        code: request.code,
        content: request.content,
        title: request.title,
        courseId: request.courseId,
      },
    });
    return this.toResponse(module);
  }

  async getAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ): Promise<{ data: ModuleResponse[]; pagination: any }> {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        }
      : {};

    const [modules, total] = await this.prismaService.$transaction([
      this.prismaService.module.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          course: {
            include: {
              instructor: true,
            },
          },
        },
      }),
      this.prismaService.module.count({ where }),
    ]);

    // console.log(modules);

    return {
      data: modules.map(this.toResponse),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string): Promise<ModuleResponse> {
    const module = await this.prismaService.module.findUnique({
      where: { id },
    });
    if (!module) throw new HttpException('Module not found', 404);
    return this.toResponse(module);
  }

  async update(
    id: string,
    request: UpdateModuleRequest,
  ): Promise<ModuleResponse> {
    const module = await this.prismaService.module.findUnique({
      where: { id },
    });
    if (!module) throw new HttpException('Module not found', 404);
    // Jika update courseId, pastikan courseId valid
    if (request.courseId) {
      const course = await this.prismaService.course.findUnique({
        where: { id: request.courseId },
      });
      if (!course) throw new HttpException('Course not found', 404);
    }
    const updated = await this.prismaService.module.update({
      where: { id },
      data: {
        title: request.title,
        courseId: request.courseId,
        code: request.code,
        content: request.content,
      },
    });
    return this.toResponse(updated);
  }

  async delete(id: string): Promise<void> {
    const module = await this.prismaService.module.findUnique({
      where: { id },
    });
    if (!module) throw new HttpException('Module not found', 404);
    await this.prismaService.module.delete({ where: { id } });
  }

  private toResponse(module: any): ModuleResponse {
    return {
      id: module.id,
      code: module.code,
      title: module.title,
      instructor: module.course?.instructor?.name,
      content: module.content,
      courseId: module.courseId,
      courseName: module.course?.title,
      createdAt: module.createdAt,
      updatedAt: module.updatedAt,
    };
  }
}
