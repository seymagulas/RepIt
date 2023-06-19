import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../ContextProvider/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ISet } from '../../utils/interfaces';
import { getWorkout } from '../../services/workout.service';
import { getFinishedWorkout, createFinishedWorkout, deleteFinishedWorkout } from '../../services/finishedWorkout.service';
import './Active-Workout.css';

const ActiveWorkout: React.FC = () => {
  const {
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
  const [repeat, setRepeat] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(currentDate);
  }, []);

  useEffect(() => {
    if (finishedWorkoutId !== null) {
      getFinishedWorkout(finishedWorkoutId).then(data => {
        setWorkoutData(data);
        const setDetails: ISet[] = [];
        data.exercises.forEach((exercise) => {
          for (let i = 0; i < exercise.sets; i++) {
            const setIndex = setDetails.length;
            const set: ISet = {
              weight: 0,
              reps: 0,
              ...exercise.setDetails[i],
            };
            setDetails[setIndex] = set;
          }
        });
        const weights = setDetails.map((set) => set.weight);
        const reps = setDetails.map((set) => set.reps);

        setWeightData(weights);
        setRepsData(reps);
      });
    } else if (selectedWorkoutId) {
      getWorkout(selectedWorkoutId).then(data => {
        setWorkoutData(data);
        const setDetails: ISet[] = [];
        data.exercises.forEach(exercise => {
          for (let i = 0; i < exercise.sets; i++) {
            const set: ISet = {
              weight: 0,
              reps: 0,
            };
            setDetails.push(set);
          }
        });

        const weights = setDetails.map((set) => set.weight);
        const reps = setDetails.map((set) => set.reps);

        setWeightData(weights);
        setRepsData(reps);
      });
    }
  }, [finishedWorkoutId, selectedWorkoutId, repeat]);

  const handleWeightChange = (index: number, value: number) => {
    const newWeightData = [...weightData];
    newWeightData[index] = value;
    setWeightData(newWeightData);
  };

  const handleRepsChange = (index: number, value: number) => {
    const newRepsData = [...repsData];
    newRepsData[index] = value;
    setRepsData(newRepsData);
  };

  const handleSubmit = async () => {
    const finishedWorkoutData = { ...workoutData, date: currentDate };

    if (finishedWorkoutId) delete finishedWorkoutData._id;
    if (selectedWorkoutId) delete finishedWorkoutData._id;

    finishedWorkoutData.exercises.forEach((exercise, exerciseIndex) => {
      exercise.setDetails = [...Array(exercise.sets)].map((_, setIndex) => ({
        weight: weightData[exerciseIndex * exercise.sets + setIndex] || 0,
        reps: repsData[exerciseIndex * exercise.sets + setIndex] || 0,
      }));
    });

    await createFinishedWorkout(finishedWorkoutData);

    setFinishedWorkoutId(null);
    setSelectedWorkoutId(null);
    setRepeat(false);
  };

  const handleDone = async () => {
    await handleSubmit();
    navigate('/');
  };

  const handleDelete = async () => {
    const result = await deleteFinishedWorkout(finishedWorkoutId);
    if (result) {
      setRepeat(false);
      navigate('/');
    }
  };

  const handleClickRepeat = () => {
    setRepeat(!repeat);
  }

  return (
    <div>
      <div className='header'>
        <button className='back-btn' onClick={() => {
          navigate('/');
          setSelectedWorkoutId(null);
        }}>
          <i className="fas fa-chevron-left"></i>
        </button>
        {finishedWorkoutId !== null && repeat === false ? (
          <button className='repeat-btn' onClick={handleClickRepeat}>RESTART</button>
        ) : (
          <button className='done-btn' onClick={() => handleDone()}>
            DONE
          </button>
        )}
        <h2 className='date'>{currentDate}</h2>
      </div>

      <div className='name-workout-box'>
        <h2 className='name-workout'>{workoutData?.name}</h2>
      </div>

      {!workoutData ? 
      null : 
      workoutData?.exercises.map((exercise, exerciseIndex) => (
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
                value={weightData[exerciseIndex * exercise.sets + setIndex] || 0}
                onChange={(e) =>
                  handleWeightChange(
                    exerciseIndex * exercise.sets + setIndex,
                    Number(e.target.value)
                  )
                }
              />
              <p>Reps:</p>
              <input
                className='workout-input'
                type='number'
                value={repsData[exerciseIndex * exercise.sets + setIndex] || 0}
                onChange={(e) =>
                  handleRepsChange(
                    exerciseIndex * exercise.sets + setIndex,
                    Number(e.target.value)
                  )
                }
              />
            </div>
          ))}
        </div>
      ))}
      {finishedWorkoutId && (
        <div className='delete-box'>
          <button className='delete-btn' onClick={handleDelete}>
            DELETE THIS WORKOUT
            <FontAwesomeIcon icon={faTrashAlt} className='delete-icon' />
          </button>
      </div>
      )}
    </div>
  );
};

export default ActiveWorkout;
