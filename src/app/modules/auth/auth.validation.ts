import { z } from 'zod';

export const loginValidationSchema = z.object({
  id: z.string({ required_error: 'Id is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

export const changePasswordValidation = z.object({
  oldPassword: z.string({ required_error: 'Id is required' }),
  newPassword: z.string({ required_error: 'Password is required' }),
});
