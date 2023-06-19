import React from 'react';
import { ToastContainer } from "react-toastify";
import AppRouter from './router';
import ContextProvider from './components/ContextProvider/ContextProvider';


function App() {
  return (
   <ContextProvider>
    <AppRouter />
    <ToastContainer position='top-right' theme="colored" />
   </ContextProvider>
  );
}

export default App;
