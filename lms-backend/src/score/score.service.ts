import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import {
  CreateScoreRequest,
  UpdateScoreRequest,
  ScoreResponse,
} from 'src/model/score.model';

@Injectable()
export class ScoreService {
  constructor(private prismaService: PrismaService) {}

  async create(request: CreateScoreRequest): Promise<ScoreResponse> {
    // Pastikan enrollment dan module valid
    const enrollment = await this.prismaService.enrollment.findUnique({
      where: { id: request.enrollmentId },
    });
    if (!enrollment) throw new HttpException('Enrollment not found', 404);
    const module = await this.prismaService.module.findUnique({
      where: { id: request.moduleId },
    });
    if (!module) throw new HttpException('Module not found', 404);
    const score = await this.prismaService.score.create({
      data: {
        score: request.score,
        enrollmentId: request.enrollmentId,
        moduleId: request.moduleId,
      },
    });
    return this.toResponse(score);
  }

  async getAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ): Promise<{ data: ScoreResponse[]; pagination: any }> {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [
            { module: { title: { contains: search, mode: 'insensitive' } } },
            {
              enrollment: {
                user: { name: { contains: search, mode: 'insensitive' } },
              },
            },
          ],
        }
      : {};

    const [scores, total] = await this.prismaService.$transaction([
      this.prismaService.score.findMany({
        where,
        skip,
        take: limit,
        orderBy: { score: 'desc' },
        include: {
          module: {
            include: {
              course: true,
            },
          },
          enrollment: {
            include: {
              user: true,
              course: true,
            },
          },
        },
      }),
      this.prismaService.score.count({ where }),
    ]);

    // console.log(scores);

    return {
      data: scores.map(this.toResponse),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string): Promise<ScoreResponse> {
    const score = await this.prismaService.score.findUnique({ where: { id } });
    if (!score) throw new HttpException('Score not found', 404);
    return this.toResponse(score);
  }

  async update(
    id: string,
    request: UpdateScoreRequest,
  ): Promise<ScoreResponse> {
    const score = await this.prismaService.score.findUnique({ where: { id } });
    if (!score) throw new HttpException('Score not found', 404);
    // Jika update enrollmentId/moduleId, pastikan valid
    if (request.enrollmentId) {
      const enrollment = await this.prismaService.enrollment.findUnique({
        where: { id: request.enrollmentId },
      });
      if (!enrollment) throw new HttpException('Enrollment not found', 404);
    }
    if (request.moduleId) {
      const module = await this.prismaService.module.findUnique({
        where: { id: request.moduleId },
      });
      if (!module) throw new HttpException('Module not found', 404);
    }
    const updated = await this.prismaService.score.update({
      where: { id },
      data: {
        score: request.score,
        enrollmentId: request.enrollmentId,
        moduleId: request.moduleId,
      },
    });
    return this.toResponse(updated);
  }

  async delete(id: string): Promise<void> {
    const score = await this.prismaService.score.findUnique({ where: { id } });
    if (!score) throw new HttpException('Score not found', 404);
    await this.prismaService.score.delete({ where: { id } });
  }

  private toResponse(score: any): ScoreResponse {
    return {
      id: score.id,
      score: Number(score.score),
      studentName: score.enrollment?.user?.name,
      course: score.enrollment?.course?.title,
      enrollmentId: score.enrollmentId,
      moduleId: score.moduleId,
      moduleCode: score.module?.code,
      createdAt: score.createdAt,
    };
  }
}
