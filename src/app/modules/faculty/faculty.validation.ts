import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const facultyValidationSchema = z.object({
  password: z.string(),
  faculty: z.object({
    designation: z.string(),
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female', 'others']),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    academicDepartment: z.string(),
    profileImg: z.string().optional(),
  }),
});

export default facultyValidationSchema;
