/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import HttpStatus from 'http-status-codes';


const notFound = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found!',
    statusCode: HttpStatus.NOT_FOUND, // or other relevant HTTP status code
    error: '',
  });
};

export default notFound;