import React, { createContext, useState } from 'react';
export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  //workouts
  const [workouts, setWorkouts] = useState([]);
  const addWorkout = (workoutData) => {
    setWorkouts([...workouts, workoutData]);
  };
  //view 
  const [currentView, setCurrentView] = useState('logbook');
  const changeView = (newView) => {
    setCurrentView(newView);
  }
  // save workout id
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);

  // save finished workout id
  const [finishedWorkoutId, setFinishedWorkoutId] = useState(null);
  
  //
  const [workoutData, setWorkoutData] = useState(null);
  
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