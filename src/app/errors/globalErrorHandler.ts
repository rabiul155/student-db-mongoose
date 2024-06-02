import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import {
  ErrorSourcesType,
  handleZodError,
  mongooseCastError,
  mongooseValidationError,
  duplicateFieldValueError,
} from './errorHandler';
import { AppError } from './AppError';

//default values
let statusCode = 500;
let message = 'Something went wrong general error';
let errorSource: ErrorSourcesType[] = [
  {
    path: '',
    message: 'Something went wrong general error',
  },
];

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
    statusCode = simplifiedError.statusCode;
  } else if (err.name === 'ValidationError') {
    const simplifiedError = mongooseValidationError(err);
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
    statusCode = simplifiedError.statusCode;
  } else if (err.name === 'CastError') {
    const simplifiedError = mongooseCastError(err);
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
    statusCode = simplifiedError.statusCode;
  } else if (err?.code === 11000) {
    const simplifiedError = duplicateFieldValueError(err);
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
    statusCode = simplifiedError.statusCode;
  } else if (err instanceof AppError) {
    message = err.message;
    errorSource = [
      {
        path: '',
        message: err.message,
      },
    ];
    statusCode = err.statusCode;
  }

  return res.status(statusCode).json({
    err,
    success: false,
    message: err.message || message,
    errorSource,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};
