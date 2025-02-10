/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import mongoose from 'mongoose';

type TErrorResponse = {
  success: boolean;
  message: string;
  statusCode: number; // or other relevant HTTP status code
  error: any;
  stack: any;
};

const globalErrorHandler = (
  err: TErrorResponse,
  req: Request,
  res: Response,
  next?: NextFunction,
) => {
  if (err instanceof mongoose.Error.CastError) {
    res.status(err.statusCode || HttpStatus.BAD_REQUEST).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode || HttpStatus.BAD_REQUEST, // or other relevant HTTP status code
      error: err,
      stack: err.stack,
    });
  }
  else if (err instanceof Error) {
    res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'Something went wrong!',
      statusCode: err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR, // or other relevant HTTP status code
      error: err,
      stack: err.stack,
    });
  }
};

export default globalErrorHandler;
