import React, { useContext, useEffect, useState } from 'react';
import './Active-Workout.css';
import { AppContext } from '../ContextProvider/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ActiveWorkout = () => {
  const {
    changeView,
    workoutData,
    finishedWorkoutId,
    setFinishedWorkoutId,
    setWorkoutData,
    selectedWorkoutId,
    setSelectedWorkoutId,
  } = useContext(AppContext);
  const [currentDate, setCurrentDate] = useState('');
  const [weightData, setWeightData] = useState([]);
  const [repsData, setRepsData] = useState([]);
  // const [prevWeightData, setPrevWeightData] = useState([]);
  // const [prevRepsData, setPrevRepsData] = useState([])
  const [repeat, setRepeat] = useState(false);

  console.log(finishedWorkoutId);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(currentDate);
  }, []);

  useEffect(() => {
    if (finishedWorkoutId !== null) {
      fetch(`http://localhost:3001/finishedWorkouts/${finishedWorkoutId}`)
        .then((response) => response.json())
        .then((data) => {
          setWorkoutData(data);
          const setDetails = [];
          data.exercises.forEach((exercise) => {
            for (let i = 0; i < exercise.sets; i++) {
              const setIndex = setDetails.length;
              const set = {
                weight: '',
                reps: '',
                ...exercise.setDetails[i],
              };
              setDetails[setIndex] = set;
            }
          });

          const weights = setDetails.map((set) => set.weight);
          const reps = setDetails.map((set) => set.reps);

          setWeightData(weights);
          setRepsData(reps);
        })
        .catch((error) => {
          console.log('Error fetching finished workout details:', error);
        });
    } else {
      fetch(`http://localhost:3001/workouts/${selectedWorkoutId}`)
        .then((response) => response.json())
        .then((data) => {
          setWorkoutData(data);
          const setDetails = [];
          data.exercises.forEach((exercise) => {
            for (let i = 0; i < exercise.sets; i++) {
              const set = {
                weight: '',
                reps: '',
              };
              setDetails.push(set);
            }
          });

          const weights = setDetails.map((set) => set.weight);
          const reps = setDetails.map((set) => set.reps);

          setWeightData(weights);
          setRepsData(reps);
        })
        .catch((error) => {
          console.log('Error fetching workout details:', error);
        });
    }
  }, [finishedWorkoutId, selectedWorkoutId, repeat]);

  const handleWeightChange = (index, value) => {
    const newWeightData = [...weightData];
    newWeightData[index] = value;
    setWeightData(newWeightData);
  };

  const handleRepsChange = (index, value) => {
    const newRepsData = [...repsData];
    newRepsData[index] = value;
    setRepsData(newRepsData);
  };

  const handleSubmit = () => {
    const finishedWorkoutData = { ...workoutData, date: currentDate };

    if (finishedWorkoutId) delete finishedWorkoutData._id;
    if (selectedWorkoutId) delete finishedWorkoutData._id;

    finishedWorkoutData.exercises.forEach((exercise, exerciseIndex) => {
      exercise.setDetails = [...Array(exercise.sets)].map((_, setIndex) => ({
        weight: weightData[exerciseIndex * exercise.sets + setIndex] || '',
        reps: repsData[exerciseIndex * exercise.sets + setIndex] || '',
      }));
    });

    fetch('http://localhost:3001/finishedWorkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finishedWorkoutData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Finished workout submitted:', data);
      })
      .catch((error) => {
        console.log('Error submitting finished workout:', error);
      });
    console.log(finishedWorkoutData);
    setFinishedWorkoutId(null);
    setSelectedWorkoutId(null);
    setRepeat(false);
  };

  const handleClick = (newView) => {
    if (newView === 'logbook') {
      handleSubmit();
    }
    changeView(newView);
  };

  if (!workoutData) {
    return null;
  }

  const handleDelete = () => {
    fetch(`http://localhost:3001/finishedWorkouts/${finishedWorkoutId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        changeView('logbook');
        setRepeat(false);
        console.log('Finished workout deleted:', data);
      })
      .catch((error) => {
        console.log('Error deleting finished workout:', error);
      });
  };

  const handleClickRepeat = () => {
    setRepeat(!repeat);
    // setPrevWeightData(weightData);
    // setPrevRepsData(repsData);
  }

  return (
    <div>
      <div className='header'>
        <button className='back-btn' onClick={() => {
          changeView('logbook')
          setSelectedWorkoutId(null);
        }}>
          <i className="fas fa-chevron-left"></i>
        </button>
        {finishedWorkoutId !== null && repeat === false ? (
          <button className='repeat-btn' onClick={handleClickRepeat}>RESTART</button>
        ) : (
          <button className='done-btn' onClick={() => handleClick('logbook')}>
            DONE
          </button>
        )}
        <h2 className='date'>{currentDate}</h2>
      </div>

      <div className='name-workout-box'>
        <h2 className='name-workout'>{workoutData.name}</h2>
      </div>

      {workoutData.exercises.map((exercise, exerciseIndex) => (
        <div className='exercise-box' key={exerciseIndex}>
          <div className="exercise-header">
            <h3 className='name-exercise'>{exercise.exercise}</h3>
            <FontAwesomeIcon icon={faTrashAlt} className='delete-icon-small' />
          </div>
          {[...Array(exercise.sets)].map((_, setIndex) => (
            <div className='set-row' key={setIndex}>
              <p>{setIndex + 1}</p>
              <p>Weight:</p>
              <input
                className='workout-input'
                type='number'
                value={weightData[exerciseIndex * exercise.sets + setIndex] || '' }
                // should make the prevWeightData as placeholder here.
                onChange={(e) =>
                  handleWeightChange(
                    exerciseIndex * exercise.sets + setIndex,
                    e.target.value
                  )
                }
              />
              <p>Reps:</p>
              <input
                className='workout-input'
                type='number'
                value={repsData[exerciseIndex * exercise.sets + setIndex] || ''}
                // should make the prevRepsData as placeholder here.
                onChange={(e) =>
                  handleRepsChange(
                    exerciseIndex * exercise.sets + setIndex,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      ))}
      <div className='delete-box'>
        <button className='delete-btn' onClick={handleDelete}>
          DELETE THIS WORKOUT
          <FontAwesomeIcon icon={faTrashAlt} className='delete-icon' />
        </button>
      </div>
    </div>
  );
};

export default ActiveWorkout;
