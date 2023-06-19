import React, { createContext, useState, ReactNode } from 'react';
import { IWorkout } from '../../utils/interfaces';

interface IAppContext {
  setWorkouts: React.Dispatch<React.SetStateAction<IWorkout[]>>;
  addWorkout: (workoutData: IWorkout) => void;
  workouts: IWorkout[];
  changeView: (newView: string) => void;
  currentView: string;
  selectedWorkoutId: string | null;
  setSelectedWorkoutId: React.Dispatch<React.SetStateAction<string | null>>;
  setWorkoutData: React.Dispatch<React.SetStateAction<any>>;
  workoutData: IWorkout | null;
  finishedWorkoutId: string | null;
  setFinishedWorkoutId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  //workouts
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const addWorkout = (workoutData: IWorkout) => {
    setWorkouts([...workouts, workoutData]);
  };
  //view 
  const [currentView, setCurrentView] = useState('logbook');
  const changeView = (newView: string) => {
    setCurrentView(newView);
  }
  // save workout id
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);

  // save finished workout id
  const [finishedWorkoutId, setFinishedWorkoutId] = useState<string | null>(null);
  
  //
  const [workoutData, setWorkoutData] = useState<IWorkout | null>(null);
  
  return (
    <AppContext.Provider value={{
      setWorkouts,
      addWorkout,
      workouts,
      changeView,
      currentView,
      selectedWorkoutId,
      setSelectedWorkoutId,
      setWorkoutData,
      workoutData,
      finishedWorkoutId,
      setFinishedWorkoutId
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider;