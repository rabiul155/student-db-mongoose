import { z } from 'zod';

export const SemesterRegistrationValidationSchema = z.object({
  academicSemester: z.string({ required_error: 'Academic semester required' }),
  status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
  startDate: z.string(),
  endDate: z.string(),
  minCredit: z.number(),
  maxCredit: z.number(),
});
