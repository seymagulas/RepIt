import mongoose from './index';
import { ExerciseSchema, IExercise } from './workoutModel';

export interface IFinishedWorkout {
  user_id: string;
  name: string;
  exercises: IExercise[];
  date?: string;
}

const finishedWorkoutSchema = new mongoose.Schema<IFinishedWorkout>({
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  exercises: [ExerciseSchema],
  date: {
    type: Date,
    default: Date.now
  }
});

export const FinishedWorkout = mongoose.model<IFinishedWorkout>(
  'FinishedWorkout',
  finishedWorkoutSchema
);
