import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import {
  ErrorSourcesType,
  handleZodError,
  mongooseValidationError,
} from './errorHandler';

//default values
const statusCode = 500;
const message = 'Something went wrong general error';
const errorSource: ErrorSourcesType[] = [
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
  // if (err instanceof ZodError) {
  //   const simplifiedError = handleZodError(err);
  //   message = simplifiedError.message;
  //   errorSource = simplifiedError.errorSource;
  //   statusCode = simplifiedError.statusCode;
  // } else if (err.name === 'ValidationError') {
  //   const simplifiedError = mongooseValidationError(err);
  //   message = simplifiedError.message;
  //   errorSource = simplifiedError.errorSource;
  //   statusCode = simplifiedError.statusCode;
  // }

  return res.status(statusCode).json({
    // success: false,
    // message,
    err,
    // errorSource,
    // stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};
