import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

type ErrorSourceType = {
  path: string | number;
  message: string;
};

const handleZodError = (err) => {
  const error = {};
};

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  //default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorSource: ErrorSourceType[] = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.message;
    errorSource = [
      {
        path: '500',
        message: 'hell',
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    error: err,
  });
};
