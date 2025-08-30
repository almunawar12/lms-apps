export interface LoginTypes {
  email: string;
  password: string;
}

export interface RegisterTypes {
  email: string;
  password: string;
  name: string;
}

export interface UserTypes {
  id?: string;
  email: string;
  name: string;
  role: "admin" | "student" | "instructor";
}

export interface CourseTypes {
  id?: string;
  title: string;
  description: string;
  instructorId?: string;
  instructorName: string;
  startDate: string;
}

export interface ModuleTypes {
  id: string;
  code?: string;
  title: string;
  instructor?: string;
  content?: string;
  courseId: string;
  courseName: string;
}

export interface EnrolmentTypes {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  enrolmentDate: string;
}

export interface ScoreTypes {
  id: string;
  score: string;
  studentName: string;
  course?: string;
  moduleCode?: string;
  enrollmentId: string;
  moduleId: string;
  moduleTitle: string;
}
