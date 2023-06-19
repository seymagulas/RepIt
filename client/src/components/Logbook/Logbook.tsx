import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../ContextProvider/ContextProvider';
import { getAllFinishedWorkouts } from '../../services/finishedWorkout.service';
import { IFinishedWorkout } from '../../utils/interfaces';
import './Logbook.css';

const Logbook: React.FC = () => {
    const navigate = useNavigate();
    const { setFinishedWorkoutId } = useContext(AppContext);
    const [finishedWorkouts, setFinishedWorkouts] = useState<IFinishedWorkout[]>([]);

    useEffect(() => {
      getAllFinishedWorkouts().then(data => setFinishedWorkouts(data));
    }, []);

    const handleClick = (workoutId: string) => {
      navigate('/active-workout');
      setFinishedWorkoutId(workoutId);
    };

    return (
      <div className="logbook">
        <h1>Logbook</h1>
        <div className="logged-workouts">
          <div className="mock-month-year">
            <p className='month-year'>June 2023</p>
          </div>            
          {finishedWorkouts.map((workout) => (
            <div className="workout-container" key={workout._id} onClick={() => handleClick(workout._id)}>
              <div className="workout-date">
                <p className="day">{new Date(workout.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <p className="day-number">{new Date(workout.date).getDate()}</p>
              </div>
              <div className="workout-info">
                <h3>{workout.name}</h3>
                {workout.exercises.map((exercise, exerciseIndex) => (
                  <p key={exerciseIndex}>
                    {exercise.sets} x {exercise.exercise}
                  </p>
                ))}
              </div>
            </div>
          ))}   
      </div>
    </div>
  );
}
export default Logbook;
