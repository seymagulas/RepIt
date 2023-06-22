import Koa from 'koa';
import { router } from './router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

export const app: Koa = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(router.routes());
