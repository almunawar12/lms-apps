import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseRequest {
  @ApiProperty({ example: 'Course Title' })
  title: string;

  @ApiProperty({ example: 'Course description', required: false })
  description?: string;

  @ApiProperty({ example: 'instructor-uuid' })
  instructorId: string;

  @ApiProperty({ example: new Date().toISOString() })
  @Transform(({ value }) => new Date(value))
  startDate: Date;
}

export class UpdateCourseRequest {
  @ApiProperty({ example: 'Course Title', required: false })
  title?: string;

  @ApiProperty({ example: 'Course description', required: false })
  description?: string;

  @ApiProperty({ example: 'instructor-uuid', required: false })
  instructorId?: string;

  @ApiProperty({ example: new Date().toISOString(), required: false })
  startDate?: Date;
}

export class CourseResponse {
  @ApiProperty({ example: 'course-uuid' })
  id: string;

  @ApiProperty({ example: 'Course Title' })
  title: string;

  @ApiProperty({ example: 'Course description', required: false })
  description?: string;

  @ApiProperty({ example: 'instructor-uuid' })
  instructorId: string;

  @ApiProperty({ example: 'Instructor Name' })
  instructorName: string;

  @ApiProperty({ example: new Date().toISOString() })
  startDate: Date;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;

  @ApiProperty({ example: new Date().toISOString() })
  updatedAt: Date;
}
