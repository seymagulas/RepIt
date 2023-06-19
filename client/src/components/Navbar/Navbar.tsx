import React from 'react';
import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='workouts'>
      <nav className="navbar">
        <button
          className={`navbar-button ${!location.pathname.includes('/workouts') ? 'blue' : ''}`}
          onClick={() => navigate('/')}>
          <i className="fas fa-book fa-2x"></i> Logbook
        </button>
        <button
          className={`navbar-button ${location.pathname.includes('/workouts') ? 'blue' : ''}`}
          onClick={() => navigate('/workouts')}>
          <i className="fas fa-dumbbell fa-2x"></i> Workouts
        </button>
      </nav>
    </div>
  );
};

export default Navbar;


