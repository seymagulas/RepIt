import Router from 'koa-router';
import { register, login, userDetails } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const authRouter = new Router();

authRouter.post('register', register);
authRouter.post('login', login);
authRouter.get('user', authMiddleware, userDetails );