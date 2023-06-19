import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MakeOrStartWorkout.css';
import { AppContext } from '../ContextProvider/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import { IExercise } from '../../utils/interfaces';
import { updateWorkout, createWorkout, deleteWorkout } from '../../services/workout.service';

const MakeOrStartWorkout: React.FC = () => {
  const { addWorkout, workouts, setWorkouts, selectedWorkoutId, setWorkoutData, setSelectedWorkoutId, setFinishedWorkoutId } = useContext(AppContext);
  const [name, setName] = useState<string>('');
  const [exercises, setExercises] = useState<IExercise[]>([{ exercise: '', sets: 0 }]);
  const navigate = useNavigate();
 
  useEffect(() => {
    setFinishedWorkoutId(null);
  }, []);

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

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (name.length === 0) {
      toast.error('Workout name is required');
      throw new Error();
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
      const result = await updateWorkout(selectedWorkoutId, workoutData);
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
      const result = await createWorkout(workoutData);
      if (result) {
        addWorkout(workoutData);
        setSelectedWorkoutId(result._id);
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
              handleSubmit(e).then(() => {navigate('/workouts')}).catch(() => console.log('Error'));
            }}
          >
          <i className="fas fa-chevron-left"></i>
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
            </div>
          ))}
          <div className='add-ex-box'>
            <button className='add-exercise' onClick={handleAddExercise}>
              <FontAwesomeIcon icon={faPlus} />
              &nbsp;Add Exercise
            </button>
          </div>
          <div className='delete-box-container'>
            <button className='workout-btn delete-workout-btn' onClick={handleDelete}>
              DELETE
              <FontAwesomeIcon icon={faTrashAlt} className='delete-icon' />
            </button>
            <button
              className='workout-btn start-workout-btn'
              onClick={(e) => {
                handleSubmit(e).then(() => {navigate('/active-workout')}).catch(() => console.log('Error'));
              }}
            >
              START
              <FontAwesomeIcon icon={faDumbbell} className='delete-icon' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeOrStartWorkout;
