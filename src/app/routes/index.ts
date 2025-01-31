import { Router } from 'express';
import userRouter from '../modules/users/user.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
