import React, { useContext, useEffect } from 'react';
import './Workouts-list.css';
import { AppContext } from '../ContextProvider/ContextProvider';

const Workouts = () => {
  const { workouts, changeView, setSelectedWorkoutId, setWorkouts } = useContext(AppContext);
  
  const fetchWorkouts = async () => {
    try {
      const response = await fetch('http://localhost:3001/workouts'); 
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [workouts]);

  const handleClickBack = (newView) => {
    changeView(newView);
    setSelectedWorkoutId(null);
  }
  const handleClickWorkout = (workoutId) => {
    console.log(workoutId);
    setSelectedWorkoutId(workoutId);
    changeView('makeOrStart');
  }

  return (
    <div className='flex-box'>
      <div className='add-workout'>
        <button className='add-btn' onClick={() => handleClickBack('makeOrStart')} >+</button>
      </div>
      <h1 className='list-title'>Workouts</h1>
      <div className='made-workouts'>
        {workouts.length === 0 ? (
          <p className='default-text'>No workouts yet</p>
        ) : (
          workouts.map((workout) => (
            <button className='workout-bar' key={workout._id} value={workout._id} onClick={() => handleClickWorkout(workout._id)}>
              <p>{workout.name}<i className="fas fa-chevron-right"></i></p>
            </button>
        )))}
      </div>
    </div>
  );
};

export default Workouts;