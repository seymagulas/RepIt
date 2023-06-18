import  bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import { Context } from "koa";
import bodyParser from 'koa-bodyparser';

const SECRET_KEY = process.env.SECRET_KEY || 'secret_key';

interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export const register = async (ctx: Context) => {
  try {
    const { email, password, confirmPassword, name} = ctx.request.body as RegisterRequest;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      ctx.status = 422;
      ctx.body = 'User already exists, please login.';
      return;
    }

    if (password === '') {
      ctx.status = 422;
      ctx.body = 'Password cannot be emty.';
      return;
    }

    if (password !== confirmPassword) {
      ctx.status = 422;
      ctx.body = 'Passwords do not match.';
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    await UserModel.create({
      email,
      name,
      password: hash
    });

    ctx.status = 201;
    return;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = 'Could not create user'
  }
}

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (ctx: Context) => {
  try {
    const { email, password } = ctx.request.body as LoginRequest;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      throw new Error();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error();
    }

    const accessToken = jwt.sign({ id: user._id }, SECRET_KEY);
    ctx.status = 200;
    ctx.body = accessToken;

  } catch (error) {
    console.log(error);
    ctx.status = 401;
    ctx.body = 'Username or password is incorrect'
  }
}

interface UserDetailsState {
  _id: string;
  name: string;
  email: string;
}

export const userDetails = async (ctx: Context) => {
  try {
    const { _id, name, email } = ctx.state.user as UserDetailsState;
    ctx.status = 200;
    ctx.body = ({ _id, name, email });
    
  } catch (error) {
    console.log(error);
    ctx.status = 404;
    ctx.body = 'Not found'
  }
}
