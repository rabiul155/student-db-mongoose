import { z } from 'zod';
import {
  Months,
  academicSemesterCode,
  academicSemesterName,
} from './academicSemester.constant';

export const academicSemesterValidationSchema = z.object({
  name: z.enum(academicSemesterName as [string, ...string[]]),
  code: z.enum(academicSemesterCode as [string, ...string[]]),
  year: z.string(),
  startMonth: z.enum(Months as [string, ...string[]]),
  endMonth: z.enum(Months as [string, ...string[]]),
});
