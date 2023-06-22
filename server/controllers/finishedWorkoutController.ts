import { FinishedWorkout } from '../models/finishedWorkoutModel';
import { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import { IExercise } from '../models/workoutModel';

interface CreateFinishedWorkoutRequest {
  name: string;
  exercises: IExercise[];
  date?: string;
}

export const createFinishedWorkout = async (ctx: Context) => {
  try {
    const { name, exercises, date } = ctx.request.body as CreateFinishedWorkoutRequest;
    const user = ctx.state.user;
    const finishedWorkout = await FinishedWorkout.create({
      name,
      exercises,
      date,
      user_id: user._id
    });
    ctx.status = 201;
    ctx.body = finishedWorkout;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error creating finished workout.' };
  }
};

export const getAllFinishedWorkouts = async (ctx: Context) => {
  try {
    const user = ctx.state.user;
    const finishedWorkouts = await FinishedWorkout.find({ user_id: user._id });
    ctx.body = finishedWorkouts;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'An error occurred while fetching finished workouts' };
  }
};

export const getFinishedWorkoutDetails = async (ctx: Context) => {
  try {
    const id = ctx.params.id;
    const user = ctx.state.user;
    const finishedWorkout = await FinishedWorkout.findOne({ _id: id, user_id: user._id });

    if (!finishedWorkout) {
      ctx.status = 404;
      ctx.body = { message: 'Finished workout not found' };
      return;
    }
    ctx.body = finishedWorkout;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'An error occurred while fetching finished workout details' };
  }
};

export const deleteFinishedWorkout = async (ctx: Context) => {
  try {
    const id = ctx.params.id;
    const user = ctx.state.user;
    const finishedWorkout = await FinishedWorkout.findOneAndDelete({ _id: id, user_id: user._id });

    if (!finishedWorkout) {
      ctx.status = 404;
      ctx.body = { message: 'Workout not found' };
      return;
    }
    ctx.status = 200;
    ctx.body = { message: 'Workout deleted' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Internal server error' };
  }
};
