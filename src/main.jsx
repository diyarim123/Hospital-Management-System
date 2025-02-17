import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// importing redux
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// importing the slices
import PatientsSlice from "./redux/patients/patientsSlice"

import App from './app';

const store = configureStore({
  reducer : {
    patients : PatientsSlice,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
          <Provider store={store}>
            <App />
          </Provider>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
