import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { AuthGuard } from "./services/auth.quard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ActiveWorkout from "./components/Active-Workout/Active-Workout";
import Workouts from "./components/Workout-list/Workouts-list";
import MakeOrStartWorkout from "./components/MakeOrStartWorkout/MakeOrStartWorkout";
import Logbook from "./components/Logbook/Logbook";

const AppRouter: React.FC = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthGuard />}>
          <Route path="/" element={<Logbook />} />
          <Route path="/active-workout" element={<ActiveWorkout />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/makeOrStart" element={<MakeOrStartWorkout />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
