// importing redux
import { createSlice } from '@reduxjs/toolkit';

// import the fetch function
import { getAppointments, postAppointment, updateAppointment ,deleteAppointment } from './appointmentsRequests';

const initialState = {
  appointments_loading: false,
  appointments_data: [],
  appointments_err: '',
};

const AppointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  extraReducers: (builder) => {
    // Fetch Appointments
    builder.addCase(getAppointments.pending, (state) => {
      state.appointments_loading = true;
      state.appointments_err = '';
    });
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      state.appointments_loading = false;
      state.appointments_data = action.payload.result;
      state.appointments_err = '';
    });
    builder.addCase(getAppointments.rejected, (state, action) => {
      state.appointments_loading = false;
      state.appointments_err = action.payload || 'The server is unreachable, Please check your API.';
    });

    // Post Appointment
    builder.addCase(postAppointment.pending, (state) => {
      state.appointments_loading = true;
      state.appointments_err = '';
    });
    builder.addCase(postAppointment.fulfilled, (state, action) => {
      state.appointments_loading = false;
      state.appointments_data = [...state.appointments_data, action.payload];
    });
    builder.addCase(postAppointment.rejected, (state, action) => {
      state.appointments_loading = false;
      state.appointments_err = action.payload || 'An error occurred while adding an appointment.';
    });

    // Update Appointment
    builder.addCase(updateAppointment.pending, (state) => {
      state.appointments_loading = true;
      state.appointments_err = '';
    });
    builder.addCase(updateAppointment.fulfilled, (state, action) => {
      state.appointments_loading = false;
      state.appointments_data = state.appointments_data.map((appointment) =>
        appointment.appointment_id === action.payload.data.appointment_id ? action.payload.data : appointment
      );
    });
    builder.addCase(updateAppointment.rejected, (state, action) => {
      state.appointments_loading = false;
      state.appointments_err = action.payload.error;
    });

    // Delete Appointment
    builder.addCase(deleteAppointment.pending, (state) => {
      state.appointments_loading = true;
      state.appointments_err = '';
    });
    builder.addCase(deleteAppointment.fulfilled, (state, action) => {
      state.appointments_loading = false;
      state.appointments_data = state.appointments_data.filter((appointment) => appointment.id !== action.payload);
    });
    builder.addCase(deleteAppointment.rejected, (state, action) => {
      state.appointments_loading = false;
      state.appointments_err = action.payload || 'An error occurred while deleting a appointment.';
    });
  },
});

export default AppointmentsSlice.reducer;
