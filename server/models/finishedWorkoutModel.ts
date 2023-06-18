import mongoose, { Schema, model } from 'mongoose';
import { ExerciseSchema, IExercise } from "./workoutModel";

export interface IFinishedWorkout {
  user_id: number;
  name: string;
  exercises: IExercise[];
  date?: string;
}

const finishedWorkoutSchema = new Schema<IFinishedWorkout>({
  user_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  exercises: [ExerciseSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

export const FinishedWorkout = model<IFinishedWorkout>('FinishedWorkout', finishedWorkoutSchema);


