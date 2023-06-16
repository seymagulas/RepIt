import React, { useContext, useState } from 'react';
import Logbook from './components/Logbook/Logbook';
import Navbar from './components/Navbar/Navbar';
import Workouts from './components/Workout-list/Workouts-list';
import MakeOrStartWorkout from './components/MakeOrStartWorkout/MakeOrStartWorkout';
import ActiveWorkout from './components/Active-Workout/Active-Workout';
import ContextProvider from './components/ContextProvider/ContextProvider';
import { AppContext } from './components/ContextProvider/ContextProvider';
import LoginForm from './components/Auth/LoginForm.tsx';
import CreateAccountForm from './components/Auth/CreateAccountForm.tsx';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <ContextProvider>
      <AppContent />
    </ContextProvider>
  );
}

function AppContent() {
  const { currentView } = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleCreateAccountClick = () => {
    setShowCreateAccount(true);
    setShowLoginForm(false);
  };

  return (
    <div className={isLoggedIn ? 'logged-in' : ''}>
      {isLoggedIn ? (
        <div>
          {currentView === 'logbook' && (
            <>
              <Logbook />
              <Navbar />
            </>
          )}
          {currentView === 'workouts' && (
            <>
              <Workouts />
              <Navbar />
            </>
          )}
          {currentView === 'makeOrStart' && <MakeOrStartWorkout />}
          {currentView === 'activeWorkout' && <ActiveWorkout />}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          {showLoginForm && (
            <>
            
              <div className="loginContainer">
                <LoginForm onLogin={handleLogin} onCreateAccountClick={handleCreateAccountClick} />
                
              </div>
            </>
          )}
          {showCreateAccount && (
            <>
              <CreateAccountForm />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;


