import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { userService } from './user.service';

const registerUser = async function (req: Request, res: Response) {
  try {
    const user = await req.body;

    const result = await userService.registereUser(user);

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

export const userController = {
    registerUser,
};