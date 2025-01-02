import { Request, Response } from 'express';
import User from './user.model';
import HttpStatus from 'http-status-codes';

const registerUser = async function (req: Request, res: Response) {
  try {
    const user = await req.body;

    const result = await User.create(user);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'User registered successfully',
      statusCode: 201,
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
      error: {
        details: error.message,
    },
      stack: error.stack,
    });
  }
};

export const userController = {
    registerUser,
};