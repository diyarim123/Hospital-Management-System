import { ToastContainer } from 'react-toastify';

import './global.css';

import { Router } from './routes/sections';
import { ThemeProvider } from './theme/theme-provider';


// ----------------------------------------------------------------------

export default function App() {

  return (
    <ThemeProvider>
        <Router />
        <ToastContainer />
    </ThemeProvider>
  );
}
