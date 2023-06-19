import axios from "axios";
import { toast } from "react-toastify";
import { authHeader } from "./auth.header";

const API_URL = process.env.REACT_APP_API_BASE_URL;

interface RegisterRequest {
  name: string; 
  password: string;
  confirmPassword: string;
  email: string;
}

export const registerUser = async ({name, email, password, confirmPassword}: RegisterRequest) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      confirmPassword
    });
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

interface LoginRequest {
  email: string; 
  password: string;
}

export const login = async ({ email, password }: LoginRequest) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    if (response.data) {
      localStorage.setItem("accessToken", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
}

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
}

export const getUser = async () => {
  try {
    const response = await axios.get(API_URL + "/user", { headers: authHeader() });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
