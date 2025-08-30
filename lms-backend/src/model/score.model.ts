import { ApiProperty } from '@nestjs/swagger';

export class CreateScoreRequest {
  @ApiProperty({ example: 95 })
  score: number;

  @ApiProperty({ example: 'enrollment-uuid' })
  enrollmentId: string;

  @ApiProperty({ example: 'module-uuid' })
  moduleId: string;
}

export class UpdateScoreRequest {
  @ApiProperty({ example: 95, required: false })
  score?: number;

  @ApiProperty({ example: 'enrollment-uuid', required: false })
  enrollmentId?: string;

  @ApiProperty({ example: 'module-uuid', required: false })
  moduleId?: string;
}

export class ScoreResponse {
  @ApiProperty({ example: 'score-uuid' })
  id: string;

  @ApiProperty({ example: 95 })
  score: number;

  @ApiProperty({ example: 'enrollment-uuid' })
  enrollmentId: string;

  @ApiProperty({ example: 'Course Name', required: false })
  course?: string;

  @ApiProperty({ example: 'Enrollment Name', required: false })
  enrollmentName?: string;

  @ApiProperty({ example: 'Student Name', required: false })
  studentName?: string;

  @ApiProperty({ example: 'module-uuid' })
  moduleId: string;

  @ApiProperty({ example: 'MOD-001', required: false })
  moduleCode?: string;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;
}
