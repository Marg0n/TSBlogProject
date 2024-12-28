import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "http-status-ts";


const notFound = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(HttpStatus.NOT_FOUND).send({
    success: false,
    message: 'API Not Found',
    statusCode: HttpStatus.NOT_FOUND, // or other relevant HTTP status code
    error: '',
  });
};