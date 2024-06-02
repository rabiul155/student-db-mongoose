import mongoose from 'mongoose';
import { ZodError, ZodIssue } from 'zod';

export type ErrorSourcesType = {
  path: string | number | undefined;
  message: string;
};

export type GenericErrorResponseType = {
  statusCode: number;
  message: string;
  errorSource: ErrorSourcesType[];
};

export const handleZodError = (err: ZodError): GenericErrorResponseType => {
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
): GenericErrorResponseType => {
  const errorSource: ErrorSourcesType[] = Object.values(error.errors).map(
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

export const mongooseCastError = (
  err: mongoose.Error.CastError,
): GenericErrorResponseType => {
  const errorSource: ErrorSourcesType[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    message: 'Invalid Id',
    errorSource,
  };
};

export const duplicateFieldValueError = (err) => {
  const errorSource: ErrorSourcesType[] = [
    {
      path: Object.keys(err.keyPattern)[0],
      message: `Field name : ${Object.keys(err.keyPattern)[0]} value : ${
        err.keyValue[Object.keys(err.keyPattern)[0]]
      }`,
    },
  ];
  return {
    statusCode: 400,
    message: 'Duplicate value error',
    errorSource,
  };
};
