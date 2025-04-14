import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import './global.css';

import { Router } from './routes/sections';
import { ThemeProvider } from './theme/theme-provider';

import { getPatients } from "./redux/patients/patientRequests"


// ----------------------------------------------------------------------

export default function App() {


    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPatients())
    }, [dispatch])


  return (
    <ThemeProvider>
        <Router />
        <ToastContainer />
    </ThemeProvider>
  );
}
