import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const AppRouter: React.FC = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/register' && <Navbar/>}
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default AppRouter;
