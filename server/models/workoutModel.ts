import mongoose from './index';

export interface ISet {
  weight?: number;
  reps?: number;
}

const setSchema = new mongoose.Schema<ISet>({
  weight: {
    type: Number
  },
  reps: {
    type: Number
  }
});

export interface IExercise {
  exercise: string;
  sets?: number;
  setDetails: ISet[];
}
export const ExerciseSchema = new mongoose.Schema<IExercise>({
  exercise: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    default: 0
  },
  setDetails: [setSchema]
});

export interface IWorkout extends mongoose.Document {
  user_id: string;
  name: string;
  exercises: IExercise[];
}

const WorkoutSchema = new mongoose.Schema<IWorkout>({
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  exercises: [ExerciseSchema]
});

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
