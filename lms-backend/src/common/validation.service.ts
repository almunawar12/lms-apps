import { TypeOf, ZodType } from 'zod';

export class ValidationService {
  validate<T extends ZodType<any>>(schema: T, data: unknown): TypeOf<T> {
    return schema.parse(data);
  }
}
