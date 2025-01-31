/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import HttpStatus from 'http-status-codes';


const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next?: NextFunction,
) => {
  res.status(err.statusCode || HttpStatus.BAD_REQUEST).json({
    success: false,
    message: err.message || 'Something went wrong!',
    statusCode: err.statusCode || HttpStatus.BAD_REQUEST, // or other relevant HTTP status code
    error: err,
    stack: err.stack,
  });
};

export default globalErrorHandler;