import { IExercise, Workout } from '../models/workoutModel';
import { Context } from 'koa';
import bodyParser from 'koa-bodyparser';

export const getAllWorkouts = async (ctx: Context) => {
  try {
    const user = ctx.state.user;
    const workouts = await Workout.find({ user_id: user._id });
    ctx.body = workouts;
  } catch (error) {
    console.log(error);
    ctx.body = { error: 'Failed getting all workouts' };
  }
};

export const getWorkoutById = async (ctx: Context) => {
  try {
    const user = ctx.state.user;
    const workout = await Workout.findOne({ _id: ctx.params.id, user_id: user._id });
    if (!workout) {
      ctx.status = 404;
      ctx.body = { error: 'Workout not found' };
      return;
    }
    ctx.body = workout;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error' };
  }
};

interface CreateWorkoutRequest {
  name: string;
  exercises: {
    exercise: string;
    set: number;
  };
}
export const createWorkout = async (ctx: Context) => {
  try {
    const { name, exercises } = ctx.request.body as CreateWorkoutRequest;
    const user = ctx.state.user;

    const workout = new Workout({
      name,
      exercises,
      user_id: user._id
    });

    const newWorkout = await workout.save();

    ctx.status = 201;
    ctx.body = newWorkout;
  } catch (error) {
    console.log(error);
    ctx.body = { error: 'Error while creating the workout' };
  }
};

interface UpdateWorkoutRequest {
  name: string;
  exercises: IExercise[];
}
export const updateWorkout = async (ctx: Context) => {
  try {
    const id = ctx.params.id;
    const { name, exercises } = ctx.request.body as UpdateWorkoutRequest;
    const user = ctx.state.user;

    if (!name) {
      ctx.status = 400;
      ctx.body = { error: 'Name is required' };
      return;
    }

    const workout = await Workout.findOne({ _id: id, user_id: user._id });

    if (!workout) {
      ctx.status = 404;
      ctx.body = { error: 'Workout not found' };
      return;
    }

    workout.name = name;
    workout.exercises = exercises;

    const updatedWorkout = await workout.save();

    ctx.status = 200;
    ctx.body = updatedWorkout;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

export const deleteWorkout = async (ctx: Context) => {
  try {
    const id = ctx.params.id;
    const user = ctx.state.user;
    const workout = await Workout.findOneAndRemove({ _id: id, user_id: user._id });

    if (!workout) {
      ctx.status = 404;
      ctx.body = { error: 'Workout not found' };
      return;
    }

    ctx.status = 200;
    ctx.body = { message: 'Workout deleted' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};
