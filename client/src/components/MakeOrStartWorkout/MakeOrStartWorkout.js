import React, { useContext, useState, useEffect } from 'react';
import './MakeOrStartWorkout.css';
import { AppContext } from '../ContextProvider/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const MakeOrStartWorkout = () => {
  const { addWorkout, changeView, workouts, setWorkouts, selectedWorkoutId, setWorkoutData, setSelectedWorkoutId } = useContext(AppContext);
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState([{ exercise: '', sets: '' }]);

  useEffect(() => {
    if (selectedWorkoutId) {
      const selectedWorkout = workouts.find((workout) => workout._id === selectedWorkoutId);
      setName(selectedWorkout.name);
      setExercises(selectedWorkout.exercises);
    } 
  }, [selectedWorkoutId]);

  const handleExerciseChange = (index, exOrSet, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][exOrSet] = value;
    setExercises(updatedExercises);
  };

  const handleAddExercise = (e) => {
    e.preventDefault();
    setExercises([...exercises, { exercise: '', sets: '' }]);
  };

  const handleClick = (newView) => {
    changeView(newView);
  };

  const handleSubmit = (e) => {
    if (!name) {
      console.log('Workout name is required');
      return;
    }
    e.preventDefault();
    const workoutData = {
      name,
      exercises: exercises.map((exercise) => ({
        exercise: exercise.exercise,
        sets: parseInt(exercise.sets)
      }))
    };

    setWorkoutData(workoutData);
    
    if (selectedWorkoutId !== null) {
      fetch(`http://localhost:3001/workouts/${selectedWorkoutId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workoutData)
      })
        .then((response) => {
          if (response.ok) {
            const updatedWorkouts = workouts.map((workout) => {
              if (workout._id === selectedWorkoutId) {
                return {
                  ...workout,
                  name: workoutData.name,
                  exercises: workoutData.exercises,
                };
              }
              return workout;
            });
            setWorkouts(updatedWorkouts);
            console.log(workoutData);
            console.log('Workout updated');
          } else {
            throw new Error('Failed to update workout');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      fetch('http://localhost:3001/workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workoutData)
      })
        .then((response) => {
          if (response.ok) {
            console.log('Workout created');
            console.log(workoutData);
            addWorkout(workoutData);
            response.json().then((data) => {
              setSelectedWorkoutId(data._id);
            });
          } else {
            throw new Error('Failed to create workout');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } 
  };

  const handleDelete = () => {
    if (!selectedWorkoutId) {
      handleClick('workouts');
      return;
    }
    console.log(selectedWorkoutId);
    fetch(`http://localhost:3001/workouts/${selectedWorkoutId}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          console.log('Workout deleted');
          const updatedWorkouts = workouts.filter((workout) => workout._id !== selectedWorkoutId);
          setWorkouts(updatedWorkouts);
          handleClick('workouts');
        } else {
          throw new Error('Failed to delete workout');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div>
      <div className='my-workout-container'>
        <form>
          <button
            className='back-btn'
            onClick={(e) => {
              handleSubmit(e);
              handleClick('workouts');
            }}
          >
          <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className='start-workout'
            onClick={(e) => {
              handleSubmit(e);
              handleClick('activeWorkout');
            }}
          >
            START THIS WORKOUT
          </button>
          <input
            className='nme-workout'
            placeholder='Name Workout'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {exercises.map((exercise, index) => (
            <div className='ex-and-sets' key={index}>
              <input
                className='exercise'
                placeholder='Exercise'
                value={exercise.exercise}
                onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value)}
              />
              <input
                className='sets'
                placeholder='Number of sets (e.g., 3)'
                value={exercise.sets}
                onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
              />
              <FontAwesomeIcon icon={faTrashAlt} className='trash-small' />
            </div>
          ))}
          <div className='add-ex-box'>
            <button className='add-exercise' onClick={handleAddExercise}>
              Add Exercise
            </button>
          </div>
        </form>
        <div className='delete-box'>
          <button className='delete-wo' onClick={handleDelete}>
            DELETE THIS WORKOUT
            <FontAwesomeIcon icon={faTrashAlt} className='delete-icon' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeOrStartWorkout;
