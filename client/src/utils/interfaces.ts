export interface ISet {
  weight?: number;
  reps?: number;
}

export interface IExercise {
  exercise: string;
  sets?: number;
  setDetails?: ISet[];
  [key: string]: any;
}

export interface IFinishedWorkout {
  _id?: string;
  user_id?: number;
  name?: string;
  exercises: IExercise[];
  date?: string;
}

export interface IWorkout {
  _id?: string;
  name: string;
  exercises: IExercise[];
  date?: string;
}
