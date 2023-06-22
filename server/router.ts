import Koa from 'koa';
import Router from 'koa-router';
import { authRouter } from './routes/authRouter';
import { workoutRouter } from './routes/workoutRouter';
import { finishedWorkoutRouter } from './routes/finishedWorkoutRouter';

export const router = new Router();

router.use('/', authRouter.routes());
router.use('/workouts', workoutRouter.routes());
router.use('/finishedWorkouts', finishedWorkoutRouter.routes());
router.all('(.*)', (ctx: Koa.Context) => {
  ctx.status = 404;
  ctx.body = 'Not Found';
});
