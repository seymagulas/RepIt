import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MakeOrStartWorkout.css';
import { AppContext } from '../ContextProvider/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import { IExercise } from '../../utils/interfaces';
import { updateWorkout, createWorkout, deleteWorkout } from '../../services/workout.service';

const MakeOrStartWorkout: React.FC = () => {
  const { addWorkout, changeView, workouts, setWorkouts, selectedWorkoutId, setWorkoutData, setSelectedWorkoutId } = useContext(AppContext);
  const [name, setName] = useState<string>('');
  const [exercises, setExercises] = useState<IExercise[]>([{ exercise: '', sets: 0 }]);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (selectedWorkoutId) {
      const selectedWorkout = workouts.find((workout) => workout._id === selectedWorkoutId);
      setName(selectedWorkout.name);
      setExercises(selectedWorkout.exercises);
    } 
  }, [selectedWorkoutId]);

  const handleExerciseChange = (index: number, fieldType: string, value: string) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][fieldType] = value;
    setExercises(updatedExercises);
  };

  const handleAddExercise = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setExercises([...exercises, { exercise: '', sets: 0 }]);
  };

  const handleClick = (newView: string) => {
    changeView(newView);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!name) {
      toast.error('Workout name is required');
      return;
    }
    event.preventDefault();
    const workoutData = {
      name,
      exercises: exercises.map((exercise) => ({
        exercise: exercise.exercise,
        sets: exercise.sets
      }))
    };

    setWorkoutData(workoutData);
    
    if (selectedWorkoutId !== null) {
      const result = updateWorkout(selectedWorkoutId, workoutData);
      if (result) {
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
      }
    }
    else {
      const result = createWorkout(workoutData);
      if (result) {
        addWorkout(workoutData);
        result.then((data) => {
          setSelectedWorkoutId(data._id);
        });
      }
    } 
  };

  const handleDelete = async () => {
    if (!selectedWorkoutId) {
      navigate('/workouts');
      return;
    }
    const result = await deleteWorkout(selectedWorkoutId);
    if (result) {
      const updatedWorkouts = workouts.filter((workout) => workout._id !== selectedWorkoutId);
      setWorkouts(updatedWorkouts);
      navigate('/workouts');
    }
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />
          {exercises.map((exercise, index) => (
            <div className='ex-and-sets' key={index}>
              <input
                className='exercise'
                placeholder='Exercise'
                value={exercise.exercise}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleExerciseChange(index, 'exercise', e.target.value)}
              />
              <input
                className='sets'
                placeholder='Number of sets (e.g., 3)'
                value={exercise.sets}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleExerciseChange(index, 'sets', e.target.value)}
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
