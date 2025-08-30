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
import { ModuleService } from './module.service';
import {
  CreateModuleRequest,
  UpdateModuleRequest,
  ModuleResponse,
} from 'src/model/module.model';
import { WebResponse } from 'src/model/web.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Module')
@Controller('module')
@UseGuards(JwtAuthGuard)
export class ModuleController {
  constructor(private moduleService: ModuleService) {}

  @Post()
  @HttpCode(201)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new module' })
  @ApiResponse({ status: 201, description: 'Module created successfully' })
  async create(
    @Body() request: CreateModuleRequest,
  ): Promise<WebResponse<ModuleResponse>> {
    await this.moduleService.create(request);
    return {
      success: true,
      message: 'Module created successfully',
    };
  }

  @Get()
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all modules' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Modules retrieved successfully' })
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ): Promise<WebResponse<ModuleResponse[]>> {
    const result = await this.moduleService.getAll(
      Number(page),
      Number(limit),
      search,
    );
    return {
      success: true,
      message: 'Modules retrieved successfully',
      data: result.data,
      pagination: result.pagination,
    };
  }

  @Get(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get module by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Module retrieved successfully' })
  async getById(@Param('id') id: string): Promise<WebResponse<ModuleResponse>> {
    const result = await this.moduleService.getById(id);
    return {
      success: true,
      message: 'Module retrieved successfully',
      data: result,
    };
  }

  @Put(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update module by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Module updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() request: UpdateModuleRequest,
  ): Promise<WebResponse<ModuleResponse>> {
    const result = await this.moduleService.update(id, request);
    return {
      success: true,
      message: 'Module updated successfully',
      data: result,
    };
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete module by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Module deleted successfully' })
  async delete(@Param('id') id: string): Promise<WebResponse<void>> {
    await this.moduleService.delete(id);
    return {
      success: true,
      message: 'Module deleted successfully',
    };
  }
}
