import Router from 'koa-router';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createWorkout, deleteWorkout, getAllWorkouts, getWorkoutById, updateWorkout } from '../controllers/workoutControllers';

export const workoutRouter = new Router();

workoutRouter.get('/', authMiddleware, getAllWorkouts);
workoutRouter.get('/:id', authMiddleware, getWorkoutById);
workoutRouter.post('/', authMiddleware, createWorkout);
workoutRouter.put('/:id', authMiddleware, updateWorkout);
workoutRouter.delete('/:id', authMiddleware, deleteWorkout);
