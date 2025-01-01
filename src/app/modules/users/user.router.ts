import { Router } from "express";
import { userController } from "./user.controller";


const userRouter = Router();

userRouter.post('/auth/register',userController.registerUser);

export default userRouter;