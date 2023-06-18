import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel';
import Koa from 'koa';

const SECRET_KEY = process.env.SECRET_KEY || 'secret_key';

export const authMiddleware = async (ctx: Koa.Context, next: ()=> Promise<any>) => {
  try {
    const authHeaders = ctx.headers.authorization;
    if (!authHeaders) {
      ctx.status = 403;
      return;
    }
    const token = authHeaders.split(' ')[1].replace(/"/g, '');
    const { id } = jwt.verify(token, SECRET_KEY) as { id: string };
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      ctx.status = 401;
      ctx.body = 'Invalid token';
      return;
    }

    ctx.state.user = user;
    await next();

  } catch (error) {
    ctx.status = 401;
    ctx.body = 'Please authenticate'
  }
}