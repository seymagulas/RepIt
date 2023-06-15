import React, { useContext, useEffect, useState } from 'react';
import './Logbook.css';
import { AppContext } from '../ContextProvider/ContextProvider';

const Logbook = () => {
    const { changeView, setFinishedWorkoutId } = useContext(AppContext);
    const [finishedWorkouts, setFinishedWorkouts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/finishedWorkouts')
            .then((response) => response.json())
            .then((data) => {

                setFinishedWorkouts(data.reverse());
                console.log(data);
            })
            .catch((error) => {
                console.log('Error fetching finished workouts:', error);
            });
    }, []);

    const handleClick = (workoutId) => {
        console.log(workoutId);
        changeView('activeWorkout');
        setFinishedWorkoutId(workoutId);
    };

    return (
        <div className="logbook">
            <h1>Logbook</h1>
            <div className="logged-workouts">
                {/* {finishedWorkouts.length === 0 ? (
                    // <p>no logged workouts yet</p>
                ) : ( */}
                    <>
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
                    </>
                {/* )} */}
            </div>
        </div>
    );
}
export default Logbook;
