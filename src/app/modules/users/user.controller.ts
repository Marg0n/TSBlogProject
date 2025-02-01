/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { userService } from './user.service';
import sendResponse from '../../../utils/sendResponse';
import globalErrorHandler from '../../middleware/globalErrorHandler';
import catchAsync from '../../../utils/catchAsync';

// register a user
const registerUser = catchAsync(async function (req, res) {
  const user = await req.body;

  const result = await userService.registerUser(user);

  sendResponse(res, {
    message: 'User registered successfully',
    statusCode: HttpStatus.CREATED,
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
    },
  });
});

// get all users
const getUser = catchAsync(async function (req, res) {

    const user = await userService.getUser();

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Login successful',
      statusCode: HttpStatus.OK,
      data: {
        token: 'token',
        user: user,
      },
    });
});


export const userController = {
  registerUser,
  getUser,
};
