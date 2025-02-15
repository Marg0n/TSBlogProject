/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import mongoose from 'mongoose';
import { handleZodErrors } from '../../helpers/handleZodErrors';

type TErrorResponse = {
  success: boolean;
  message: string;
  statusCode: number; // or other relevant HTTP status code
  error: any;
  stack: any;
};

const globalErrorHandler = (
  err: TErrorResponse | any,
  req: Request,
  res: Response,
  next?: NextFunction,
) => {
  // zod error
  if (err.name && err.name === 'ZodError') {
    handleZodErrors(err, res) 
  }
  // cast error
  else if (err instanceof mongoose.Error.CastError) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: err.message,
      statusCode: HttpStatus.BAD_REQUEST, // or other relevant HTTP status code
      error: err,
      stack: err.stack,
    });
  }
  // validation error
  else if (err instanceof mongoose.Error.ValidationError) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: err.message,
      statusCode: HttpStatus.BAD_REQUEST, // or other relevant HTTP status code
      error: err,
      stack: err.stack,
    });
  }
  // duplicate error
  else if (err.code && err.code === 11000) {
    res.status(err.statusCode || HttpStatus.BAD_REQUEST).json({
      success: false,
      message: err.errorResponse.errmsg,
      statusCode: err.statusCode || HttpStatus.BAD_REQUEST, // or other relevant HTTP status code
      error: err,
      stack: err.stack,
    });
  }
  // generic error
  else if (err instanceof Error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'Something went wrong!',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR, // or other relevant HTTP status code
      error: err,
      stack: err.stack,
    });
  }
};

export default globalErrorHandler;
