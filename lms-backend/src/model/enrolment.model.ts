import { ApiProperty } from '@nestjs/swagger';

export class CreateEnrolmentRequest {
  @ApiProperty({ example: 'user-uuid' })
  userId: string;

  @ApiProperty({ example: 'course-uuid' })
  courseId: string;
}

export class UpdateEnrolmentRequest {
  @ApiProperty({ example: 'user-uuid', required: false })
  userId?: string;

  @ApiProperty({ example: 'course-uuid', required: false })
  courseId?: string;
}

export class EnrolmentResponse {
  @ApiProperty({ example: 'enrolment-uuid' })
  id: string;

  @ApiProperty({ example: 'user-uuid' })
  userId: string;

  @ApiProperty({ example: 'User Name', required: false })
  userName?: string;

  @ApiProperty({ example: 'course-uuid' })
  courseId: string;

  @ApiProperty({ example: 'Course Title', required: false })
  courseTitle?: string;

  @ApiProperty({ example: new Date().toISOString() })
  enrollmentDate: Date;
}
