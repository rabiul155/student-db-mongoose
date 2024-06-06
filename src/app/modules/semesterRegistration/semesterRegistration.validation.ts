import { z } from 'zod';

export const semesterRegistrationValidationSchema = z.object({
  academicSemester: z.string({ required_error: 'Academic semester required' }),
  status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
  startDate: z.string(),
  endDate: z.string(),
  minCredit: z.number(),
  maxCredit: z.number(),
});

export const updateSemesterRegistrationValidationSchema =
  semesterRegistrationValidationSchema.partial();
