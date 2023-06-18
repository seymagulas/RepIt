import React, { useContext, FC } from 'react';
import './Navbar.css';
import { AppContext } from '../ContextProvider/ContextProvider';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { changeView, currentView } = useContext(AppContext);

  const handleClick = (newView: string): void => {
    changeView(newView);
  };

  return (
    <div className='workouts'>
      <nav className="navbar">
        <button
          className={`navbar-button ${currentView === 'logbook' ? 'blue' : ''}`}
          onClick={() => handleClick('logbook')}>
          <i className="fas fa-book fa-2x"></i> Logbook
        </button>
        <button
          className={`navbar-button ${currentView === 'workouts' ? 'blue' : ''}`}
          onClick={() => handleClick('workouts')}>
          <i className="fas fa-dumbbell fa-2x"></i> Workouts
        </button>
      </nav>
    </div>
  );
};

export default Navbar;


