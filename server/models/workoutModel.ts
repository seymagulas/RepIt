import mongoose, { Schema, model } from 'mongoose';

export interface ISet {
  weight?: number;
  reps?: number;
}

const setSchema = new Schema<ISet>({
  weight: {
    type: Number,
  },
  reps: {
    type: Number,
  },
});

export interface IExercise {
  exercise: string;
  sets?: number;
  setDetails: ISet[]
}
export const ExerciseSchema = new Schema<IExercise>({
  exercise: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    default: 0,
  },
  setDetails: [setSchema]
});

export interface IWorkout extends mongoose.Document {
  user_id: number;
  name: string;
  exercises: IExercise[]
}

const WorkoutSchema = new Schema<IWorkout>({
  user_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  exercises: [ExerciseSchema],
});

export const Workout = model<IWorkout>('Workout', WorkoutSchema);
