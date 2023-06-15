import './App.css';
import React, { useContext } from 'react';
import Logbook from './components/Logbook/Logbook';
import Navbar from './components/Navbar/Navbar';
import Workouts from './components/Workout-list/Workouts-list';
import MakeOrStartWorkout from './components/MakeOrStartWorkout/MakeOrStartWorkout';
import ActiveWorkout from './components/Active-Workout/Active-Workout';
import ContextProvider from './components/ContextProvider/ContextProvider';
import { AppContext } from './components/ContextProvider/ContextProvider';
import '@fortawesome/fontawesome-free/css/all.css';



function App() {
  return (
    <ContextProvider>
      <AppContent />
    </ContextProvider>
  );
}

function AppContent() {
  const { currentView } = useContext(AppContext);

  return (
    <div>
      {currentView === 'logbook' && (
        <div>
          <Logbook />
          <Navbar />
        </div>
      )}
      {currentView === 'workouts' && (
        <div>
          <Workouts />
          <Navbar />
        </div>
      )}
      {currentView === 'makeOrStart' && <MakeOrStartWorkout />}
      {currentView === 'activeWorkout' && <ActiveWorkout />}
    </div>
  );
}

export default App;