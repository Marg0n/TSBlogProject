import { NextFunction, Request, Response, Router } from 'express';
import { AnyZodObject } from 'zod';
import { userController } from './user.controller';
import { userValidations } from './userValidation';

const userRouter = Router();

// validation middleware
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

// routes
userRouter.post(
  '/register',
  validateRequest(userValidations.userValidationSchema),
  userController.registerUser,
);
userRouter.get(
  '/users',
  validateRequest(userValidations.userValidationSchema),
  userController.getUser,
);

export default userRouter;
