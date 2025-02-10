import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";


const userRouter = Router();

// validation middleware
const validateRequest= ()=>{
    
    return async (req: Request, res: Response, next: NextFunction)=>{

        // validation

        next();
    }
}

// routes
userRouter.post('/register', validateRequest(), userController.registerUser);
userRouter.get('/users', validateRequest(), userController.getUser);

export default userRouter;