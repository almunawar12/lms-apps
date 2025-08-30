import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequest {
  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'student', required: false })
  role?: string;
}

export class RegisterUserResponse {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'student' })
  role: string;
}

export class LoginUserRequest {
  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'student' })
  role: string;

  @ApiProperty({ example: 'jwt.token.here' })
  token: string;
}

export class UpdateUserRequest {
  @ApiProperty({ example: 'uuid', required: false })
  id?: string;

  @ApiProperty({ example: 'user@email.com', required: false })
  email?: string;

  @ApiProperty({ example: 'John Doe', required: false })
  name?: string;

  @ApiProperty({ example: 'password123', required: false })
  password?: string;

  @ApiProperty({ example: 'student', required: false })
  role?: string;
}
