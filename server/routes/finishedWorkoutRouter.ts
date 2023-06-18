import Router from 'koa-router';
import { getAllFinishedWorkouts, getFinishedWorkoutDetails, createFinishedWorkout, deleteFinishedWorkout } from '../controllers/finishedWorkoutController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const finishedWorkoutRouter = new Router();

finishedWorkoutRouter.get('/', authMiddleware, getAllFinishedWorkouts ); 
finishedWorkoutRouter.get('/:id', authMiddleware, getFinishedWorkoutDetails);
finishedWorkoutRouter.post('/', authMiddleware, createFinishedWorkout);
finishedWorkoutRouter.delete('/:id', authMiddleware, deleteFinishedWorkout);
