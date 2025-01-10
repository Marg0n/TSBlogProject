import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { userService } from './user.service';

// register a user
const registerUser = async function (req: Request, res: Response) {
  try {
    const user = await req.body;

    const result = await userService.registerUser(user);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'User registered successfully',
      statusCode: HttpStatus.CREATED,
      data: {
        _id: result._id,
        name: result.name,
        email: result.email,
      },
    });
  } catch (error: any) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Validation error',
      statusCode: HttpStatus.BAD_REQUEST,
      error: error,
      stack: error.stack,
    });
  }
};

// get all users
const getUser = async function (req: Request, res: Response) {
  try {

    const user = await userService.getUser();

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Login successful',
      statusCode: HttpStatus.OK,
      data: {
        token: "token",
      },
    });
  } catch (error: any) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid credentials',
      statusCode: HttpStatus.UNAUTHORIZED,
      error: error,
      stack: error.stack,
    });
  }
};

export const userController = {
    registerUser,
    getUser,
};