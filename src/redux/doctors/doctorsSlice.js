// importing redux
import { createSlice } from '@reduxjs/toolkit';

// import the fetch function
import { getDoctors, postDoctor, updateDoctor ,deleteDoctor } from './doctorsRequests';

const initialState = {
  doctors_loading: false,
  doctors_data: [],
  doctors_err: '',
};

const DoctorssSlice = createSlice({
  name: 'doctors',
  initialState,
  extraReducers: (builder) => {
    // Fetch Doctors
    builder.addCase(getDoctors.pending, (state) => {
      state.doctors_loading = true;
      state.doctors_err = '';
    });
    builder.addCase(getDoctors.fulfilled, (state, action) => {
      state.doctors_loading = false;
      state.doctors_data = action.payload;
      state.doctors_err = '';
    });
    builder.addCase(getDoctors.rejected, (state, action) => {
      state.doctors_loading = false;
      state.doctors_err = action.payload || 'The server is unreachable, Please check your API.';
    });

    // Post Doctor
    builder.addCase(postDoctor.pending, (state) => {
      state.doctors_loading = true;
      state.doctors_err = '';
    });
    builder.addCase(postDoctor.fulfilled, (state, action) => {
      state.doctors_loading = false;
      state.doctors_data = [...state.doctors_data, action.payload];
    });
    builder.addCase(postDoctor.rejected, (state, action) => {
      state.doctors_loading = false;
      state.doctors_err = action.payload || 'An error occurred while adding a doctor.';
    });

    // Update Doctor
    builder.addCase(updateDoctor.pending, (state) => {
      state.doctors_loading = true;
      state.doctors_err = '';
    });
    builder.addCase(updateDoctor.fulfilled, (state, action) => {
      state.doctors_loading = false;
      state.doctors_data = state.doctors_data.map((doctor) =>
        doctor.doctor_id === action.payload.data.doctor_id ? action.payload.data : doctor
      );
    });
    builder.addCase(updateDoctor.rejected, (state, action) => {
      state.doctors_loading = false;
      state.doctors_err = action.payload.error;
    });

    // Delete Doctor
    builder.addCase(deleteDoctor.pending, (state) => {
      state.doctors_loading = true;
      state.doctors_err = '';
    });
    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      state.doctors_loading = false;
      state.doctors_data = state.doctors_data.filter((doctor) => doctor.id !== action.payload);
    });
    builder.addCase(deleteDoctor.rejected, (state, action) => {
      state.doctors_loading = false;
      state.doctors_err = action.payload || 'An error occurred while deleting a doctor.';
    });
  },
});

export default DoctorssSlice.reducer;
