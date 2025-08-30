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
import { EnrolmentService } from './enrolment.service';
import {
  CreateEnrolmentRequest,
  UpdateEnrolmentRequest,
  EnrolmentResponse,
} from 'src/model/enrolment.model';
import { WebResponse } from 'src/model/web.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Enrolment')
@Controller('enrolment')
@UseGuards(JwtAuthGuard)
export class EnrolmentController {
  constructor(private enrolmentService: EnrolmentService) {}

  @Post()
  @HttpCode(201)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new enrolment' })
  @ApiResponse({ status: 201, description: 'Enrolment created successfully' })
  async create(
    @Body() request: CreateEnrolmentRequest,
  ): Promise<WebResponse<EnrolmentResponse>> {
    await this.enrolmentService.create(request);
    return {
      success: true,
      message: 'Enrolment created successfully',
    };
  }

  @Get()
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all enrolments' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Enrolments retrieved successfully',
  })
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ): Promise<WebResponse<EnrolmentResponse[]>> {
    const result = await this.enrolmentService.getAll(
      Number(page),
      Number(limit),
      search,
    );
    return {
      success: true,
      message: 'Enrolments retrieved successfully',
      data: result.data,
      pagination: result.pagination,
    };
  }

  @Get(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get enrolment by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Enrolment retrieved successfully' })
  async getById(
    @Param('id') id: string,
  ): Promise<WebResponse<EnrolmentResponse>> {
    const result = await this.enrolmentService.getById(id);
    return {
      success: true,
      message: 'Enrolment retrieved successfully',
      data: result,
    };
  }

  @Put(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update enrolment by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Enrolment updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() request: UpdateEnrolmentRequest,
  ): Promise<WebResponse<EnrolmentResponse>> {
    const result = await this.enrolmentService.update(id, request);
    return {
      success: true,
      message: 'Enrolment updated successfully',
      data: result,
    };
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete enrolment by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Enrolment deleted successfully' })
  async delete(@Param('id') id: string): Promise<WebResponse<void>> {
    await this.enrolmentService.delete(id);
    return {
      success: true,
      message: 'Enrolment deleted successfully',
    };
  }
}
