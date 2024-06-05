import { z } from 'zod';

const preRequisiteCoursesValidation = z.array(
  z.object({
    course: z.string({ required_error: 'Course id is required' }),
  }),
);

export const courseValidationSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  prefix: z.string({ required_error: 'Prefix is required' }),
  code: z.number({ required_error: 'Course code is required' }),
  credits: z.number({ required_error: 'Credits is required' }),
  preRequisiteCourses: preRequisiteCoursesValidation.optional(),
});

export const updateCourseValidationSchema = courseValidationSchema.partial();

export const facultiesWithCourseValidationSchema = z.object({
  faculties: z.array(z.string()),
});
