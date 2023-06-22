import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../ContextProvider/ContextProvider";
import { getAllWorkouts } from "../../services/workout.service";
import "./Workouts-list.css";

const Workouts: React.FC = () => {
  const { workouts, setSelectedWorkoutId, setWorkouts } =
    useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllWorkouts().then((data) => {
      setWorkouts(data);
    });
  }, []);

  const handleClickBack = () => {
    navigate("/makeOrStart");
    setSelectedWorkoutId(null);
  };

  const handleClickWorkout = (workoutId: string) => {
    setSelectedWorkoutId(workoutId);
    navigate("/makeOrStart");
  };

  return (
    <div className="flex-box">
      <div className="add-workout">
        <button className="add-btn" onClick={handleClickBack}>
          +
        </button>
      </div>
      <h1 className="list-title">Workouts</h1>
      <div className="made-workouts">
        {workouts.length === 0 ? (
          <p className="default-text">No workouts yet</p>
        ) : (
          workouts.map((workout) => (
            <button
              className="workout-bar"
              key={workout._id}
              value={workout._id}
              onClick={() => handleClickWorkout(workout._id)}
            >
              <p>
                {workout.name}
                <i className="fas fa-chevron-right"></i>
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Workouts;
