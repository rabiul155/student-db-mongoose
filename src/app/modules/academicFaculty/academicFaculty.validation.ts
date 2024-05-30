import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
});

export default academicFacultyValidationSchema;
