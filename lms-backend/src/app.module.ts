import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { ModuleModule } from './module/module.module';
import { EnrolmentModule } from './enrolment/enrolment.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    AuthModule,
    CourseModule,
    ModuleModule,
    EnrolmentModule,
    ScoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
