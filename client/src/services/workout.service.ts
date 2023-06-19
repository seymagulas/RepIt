import axios from "axios";
import { toast } from "react-toastify";
import { authHeader } from './auth.header';
import { IFinishedWorkout } from '../utils/interfaces';
import { IWorkout } from "../utils/interfaces";

const API_URL = process.env.REACT_APP_API_BASE_URL;


export const updateWorkout = async (selectedWorkoutId: string, workoutData: IWorkout) => {
  try {
    const response = await axios.put(
      `${API_URL}/workouts/${selectedWorkoutId}`, 
      workoutData, 
      { headers: authHeader() }
    );
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export const createWorkout = async (workoutData: IWorkout): Promise<IWorkout> => {
  try {
    const response = await axios.post(
      `${API_URL}/workouts`, 
      workoutData, 
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export const deleteWorkout = async (selectedWorkoutId: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/workouts/${selectedWorkoutId}`, 
      { headers: authHeader() }
    );
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}


export const getAllWorkouts = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/workouts`, 
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export const getWorkout = async (workoutId: string): Promise<IWorkout> => {
  try {
    const response = await axios.get(
      `${API_URL}/workouts/${workoutId}`, 
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}
