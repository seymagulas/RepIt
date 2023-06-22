import React from "react";
import { getCurrentUser } from "./auth.service";
import { Outlet, Navigate } from "react-router-dom";

export const AuthGuard: React.FC = () => {
  const authUser = getCurrentUser();
  return authUser ? <Outlet /> : <Navigate to={"/login"} replace />;
};
