import axios from "axios";
import { toast } from "react-toastify";
import { authHeader } from './auth.header';
import { IFinishedWorkout } from '../utils/interfaces';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getAllFinishedWorkouts = async (): Promise<IFinishedWorkout[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/finishedWorkouts`, 
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);   
  }
}

export const getFinishedWorkout = async (finishedWorkoutId: string): Promise<IFinishedWorkout> => {
  try {
    const response = await axios.get(
      `${API_URL}/finishedWorkouts/${finishedWorkoutId}`, 
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export const createFinishedWorkout = async (data: IFinishedWorkout) => {
  try {
    const response = await axios.post(
      `${API_URL}/finishedWorkouts`, 
      data, 
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export const deleteFinishedWorkout = async (finishedWorkoutId: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/finishedWorkouts/${finishedWorkoutId}`, 
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}
