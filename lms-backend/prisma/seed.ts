import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordAdmin = await bcrypt.hash('admin123', 10);
  const passwordInstructor = await bcrypt.hash('instructor123', 10);
  const passwordStudent = await bcrypt.hash('student123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@lms.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@lms.com',
      password: passwordAdmin,
      role: 'admin',
    },
  });

  await prisma.user.upsert({
    where: { email: 'instructor@lms.com' },
    update: {},
    create: {
      name: 'Instructor User',
      email: 'instructor@lms.com',
      password: passwordInstructor,
      role: 'instructor',
    },
  });

  await prisma.user.upsert({
    where: { email: 'student@lms.com' },
    update: {},
    create: {
      name: 'Student User',
      email: 'student@lms.com',
      password: passwordStudent,
      role: 'student',
    },
  });

  console.log('User seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
