import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "http-status-ts";


const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Something went wrong!',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR, // or other relevant HTTP status code
    error: { details: 'Internal Server Error' },
    stack: err.stack,
  });
};

export default globalErrorHandler;