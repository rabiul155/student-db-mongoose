import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  academicFaculty: z.string({ required_error: 'Faculty is required' }),
});

export default academicDepartmentValidationSchema;
