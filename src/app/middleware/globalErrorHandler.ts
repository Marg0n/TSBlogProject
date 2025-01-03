import { NextFunction, Request, Response } from "express";
import HttpStatus from 'http-status-codes';


const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.statusCode).json({
    success: false,
    message: 'Something went wrong!',
    statusCode: err.statusCode, // or other relevant HTTP status code
    error: err,
    stack: err.stack,
  });
};

export default globalErrorHandler;