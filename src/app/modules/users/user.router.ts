import { Router } from "express";
import { userController } from "./user.controller";


const userRouter = Router();

userRouter.post('/register',userController.registerUser);
userRouter.get('/users',userController.getUser);

export default userRouter;