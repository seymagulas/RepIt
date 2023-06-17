import React from 'react';
import { ToastContainer } from "react-toastify";
import AppRouter from './router';


function App() {
  return (
   <>
    <AppRouter />
    <ToastContainer position='top-right' />
   </>
  );
}

export default App;


