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
import { ScoreService } from './score.service';
import {
  CreateScoreRequest,
  UpdateScoreRequest,
  ScoreResponse,
} from 'src/model/score.model';
import { WebResponse } from 'src/model/web.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Score')
@Controller('score')
@UseGuards(JwtAuthGuard)
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  @Post()
  @HttpCode(201)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new score' })
  @ApiResponse({ status: 201, description: 'Score created successfully' })
  async create(
    @Body() request: CreateScoreRequest,
  ): Promise<WebResponse<ScoreResponse>> {
    const result = await this.scoreService.create(request);
    return {
      success: true,
      message: 'Score created successfully',
      data: result,
    };
  }

  @Get()
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all scores' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Scores retrieved successfully' })
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ): Promise<WebResponse<ScoreResponse[]>> {
    const result = await this.scoreService.getAll(
      Number(page),
      Number(limit),
      search,
    );
    return {
      success: true,
      message: 'Scores retrieved successfully',
      data: result.data,
      pagination: result.pagination,
    };
  }

  @Get(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get score by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Score retrieved successfully' })
  async getById(@Param('id') id: string): Promise<WebResponse<ScoreResponse>> {
    const result = await this.scoreService.getById(id);
    return {
      success: true,
      message: 'Score retrieved successfully',
      data: result,
    };
  }

  @Put(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update score by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Score updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() request: UpdateScoreRequest,
  ): Promise<WebResponse<ScoreResponse>> {
    const result = await this.scoreService.update(id, request);
    return {
      success: true,
      message: 'Score updated successfully',
      data: result,
    };
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete score by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Score deleted successfully' })
  async delete(@Param('id') id: string): Promise<WebResponse<void>> {
    await this.scoreService.delete(id);
    return {
      success: true,
      message: 'Score deleted successfully',
    };
  }
}
