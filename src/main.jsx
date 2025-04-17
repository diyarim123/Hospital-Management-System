import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// importing redux
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// importing the slices
import PatientsSlice from './redux/patients/patientsSlice';
import DoctorsSlice from './redux/doctors/doctorsSlice';
import AuthSlice from './redux/Authentication/AuthSlice';
import AppointmentsSlice from './redux/appointments/appointmentsSlice';
import DepartmentsSlice from './redux/departments/departmentsSlice';
import MedicalSlice from './redux/medical_records/medicalSlice';
import StaffSlice from './redux/staff/staffSlice';
import BillingsSlice from './redux/billings/billingsSlice';
import RoomsSlice from './redux/rooms/roomsSlice';
import AssignmentsSlice from './redux/assignments/assignmentsSlice';
import ServicesSlice from './redux/services/servicesSlice';

import App from './app';

const store = configureStore({
  reducer: {
    patients: PatientsSlice,
    doctors: DoctorsSlice,
    auth: AuthSlice,
    appointments: AppointmentsSlice,
    departments: DepartmentsSlice,
    medicals: MedicalSlice,
    staff: StaffSlice,
    billings: BillingsSlice,
    rooms: RoomsSlice,
    assignments: AssignmentsSlice,
    services: ServicesSlice,
  },
});

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
