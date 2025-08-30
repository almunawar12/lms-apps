import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleRequest {
  @ApiProperty({ example: 'MOD-001' })
  code: string;

  @ApiProperty({ example: 'Module content here' })
  content: string;

  @ApiProperty({ example: 'Introduction to Programming' })
  title: string;

  @ApiProperty({ example: 'course-uuid' })
  courseId: string;
}

export class UpdateModuleRequest {
  @ApiProperty({ example: 'MOD-001', required: false })
  code?: string;

  @ApiProperty({ example: 'Introduction to Programming', required: false })
  title?: string;

  @ApiProperty({ example: 'Module content here', required: false })
  content?: string;

  @ApiProperty({ example: 'course-uuid', required: false })
  courseId?: string;
}

export class ModuleResponse {
  @ApiProperty({ example: 'module-uuid' })
  id: string;

  @ApiProperty({ example: 'MOD-001', required: false })
  code?: string;

  @ApiProperty({ example: 'Introduction to Programming' })
  title: string;

  @ApiProperty({ example: 'Instructor Name', required: false })
  instructor?: string;

  @ApiProperty({ example: 'Module content here', required: false })
  content?: string;

  @ApiProperty({ example: 'course-uuid' })
  courseId: string;

  @ApiProperty({ example: 'Course Name' })
  courseName: string;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;

  @ApiProperty({ example: new Date().toISOString() })
  updatedAt: Date;
}
