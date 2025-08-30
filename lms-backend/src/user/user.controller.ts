import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  RegisterUserResponse,
  UpdateUserRequest,
} from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async login(
    @Body() request: LoginUserRequest,
  ): Promise<WebResponse<LoginUserResponse>> {
    const result = await this.userService.login(request);
    return {
      success: true,
      message: 'Login successful',
      token: result.token,
    };
  }

  @Post('/register')
  @HttpCode(200)
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 200, description: 'Registration successful' })
  async register(
    @Body() request: RegisterUserRequest,
  ): Promise<WebResponse<RegisterUserResponse>> {
    await this.userService.register(request);
    return {
      success: true,
      message: 'Registration successful',
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ): Promise<WebResponse<any>> {
    const result = await this.userService.getAll(
      Number(page),
      Number(limit),
      search,
    );

    return {
      success: true,
      message: 'Users retrieved successfully',
      data: result.data,
      pagination: result.pagination,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('instructors')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all instructors' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Instructors retrieved successfully',
  })
  async getAllInstructors(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ): Promise<WebResponse<any>> {
    const result = await this.userService.getAllInstructor(
      Number(page),
      Number(limit),
      search,
    );

    return {
      success: true,
      message: 'Instructors retrieved successfully',
      data: result.data,
      pagination: result.pagination,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('students')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all students' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Students retrieved successfully' })
  async getAllStudents(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ): Promise<WebResponse<any>> {
    const result = await this.userService.getAllStudent(
      Number(page),
      Number(limit),
      search,
    );

    return {
      success: true,
      message: 'Students retrieved successfully',
      data: result.data,
      pagination: result.pagination,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  async getById(
    @Param('id') id: string,
  ): Promise<WebResponse<RegisterUserResponse>> {
    const result = await this.userService.getById(id);
    return {
      success: true,
      message: 'User retrieved successfully',
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() request: UpdateUserRequest,
  ): Promise<WebResponse<RegisterUserResponse>> {
    await this.userService.update(id, request);
    return {
      success: true,
      message: 'User updated successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async delete(@Param('id') id: string): Promise<WebResponse<void>> {
    await this.userService.delete(id);
    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
