import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  RegisterUserResponse,
  UpdateUserRequest,
} from 'src/model/user.model';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { WebResponse } from 'src/model/web.model';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    this.logger.debug(`Register request: ${JSON.stringify(request)}`);

    const registerRequest = this.validationService.validate(
      UserValidation.REGISTER,
      request,
    ) as RegisterUserRequest;

    const existingUser = await this.prismaService.user.findUnique({
      where: { email: registerRequest.email },
    });
    if (existingUser) {
      throw new HttpException('Email already registered', 400);
    }

    const hashedPassword = await bcrypt.hash(registerRequest.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        name: registerRequest.name,
        email: registerRequest.email,
        password: hashedPassword,
        // role: registerRequest.role as any,
      },
    });

    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async login(request: LoginUserRequest): Promise<LoginUserResponse> {
    this.logger.debug(`Login request: ${JSON.stringify(request)}`);

    const loginRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    ) as LoginUserRequest;

    const user = await this.prismaService.user.findUnique({
      where: { email: loginRequest.email },
    });

    if (!user) {
      throw new HttpException('invalid email or password', 401);
    }

    const passwordValid = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!passwordValid) {
      throw new HttpException('Invalid email or password', 401);
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      token,
    };
  }

  async getAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ): Promise<WebResponse<any>> {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          name: {
            contains: search,
          },
        }
      : {};

    const [users, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        where,
        skip,
        take: limit,
        select: { id: true, email: true, name: true, role: true },
      }),
      this.prismaService.user.count({ where }),
    ]);

    return {
      success: true,
      message: 'Users retrieved successfully',
      data: users.map((u) => ({
        ...u,
        id: u.id.toString(),
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAllInstructor(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ): Promise<WebResponse<any>> {
    const skip = (page - 1) * limit;
    const where: any = {
      role: 'instructor',
      ...(search
        ? {
            name: {
              contains: search,
            },
          }
        : {}),
    };

    const [users, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        where,
        skip,
        take: limit,
        select: { id: true, email: true, name: true, role: true },
      }),
      this.prismaService.user.count({ where }),
    ]);

    return {
      success: true,
      message: 'Instructors retrieved successfully',
      data: users.map((u) => ({
        ...u,
        id: u.id.toString(),
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAllStudent(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ): Promise<WebResponse<any>> {
    const skip = (page - 1) * limit;
    const where: any = {
      role: 'student',
      ...(search
        ? {
            name: {
              contains: search,
            },
          }
        : {}),
    };

    const [users, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        where,
        skip,
        take: limit,
        select: { id: true, email: true, name: true, role: true },
      }),
      this.prismaService.user.count({ where }),
    ]);

    return {
      success: true,
      message: 'Students retrieved successfully',
      data: users.map((u) => ({
        ...u,
        id: u.id.toString(),
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string): Promise<RegisterUserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return {
      ...user,
      id: user.id.toString(),
    };
  }

  async update(
    id: string,
    request: UpdateUserRequest,
  ): Promise<RegisterUserResponse> {
    const updateData = this.validationService.validate(
      UserValidation.UPDATE,
      request,
    ) as UpdateUserRequest;

    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    let password: string | undefined = undefined;
    if (updateData.password) {
      password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        email: updateData.email,
        name: updateData.name,
        role: updateData.role as any,
        ...(password ? { password } : {}),
      },
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
    };
  }

  async delete(id: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    await this.prismaService.user.delete({ where: { id } });
    return;
  }
}
