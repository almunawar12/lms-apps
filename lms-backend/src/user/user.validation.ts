import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    email: z.string().min(5).max(100).email(),
    password: z.string().min(5).max(100),
    name: z.string().min(1).max(100),
    // role: z.enum(['admin', 'student', 'instructor']),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().min(5).max(100).email(),
    password: z.string().min(5).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    email: z.string().optional(),
    name: z.string().optional(),
    password: z
      .union([z.string(), z.undefined()])
      .transform((val) => (val === '' ? undefined : val))
      .refine((val) => !val || val.length >= 6, {
        message: 'Password must be at least 6 characters',
      })
      .optional(),
    role: z.enum(['admin', 'student', 'instructor']).optional(),
  });
}
