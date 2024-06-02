import mongoose from 'mongoose';
import { ZodError, ZodIssue } from 'zod';

export type ErrorSourcesType = {
  path: string | number | undefined;
  message: string;
};

export const handleZodError = (err: ZodError) => {
  const errorSource: ErrorSourcesType[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path.pop(),
      message: issue.message,
    };
  });

  return {
    statusCode: 400,
    message: 'Validation error',
    errorSource,
  };
};

export const mongooseValidationError = (
  error: mongoose.Error.ValidationError,
) => {
  const errorSource = Object.values(error.errors).map(
    (err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: err.path,
        message: err.message,
      };
    },
  );

  return {
    statusCode: 400,
    message: 'Validation error',
    errorSource,
  };
};
