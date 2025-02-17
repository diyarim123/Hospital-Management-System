// importing redux
import { createSlice } from '@reduxjs/toolkit';

// import the fetch function
import { getPatients, postPatient, deletePatient } from './patientRequests';

const initialState = {
  patients_loading: false,
  patients_data: [],
  patients_err: '',
};

const PatientsSlice = createSlice({
  name: 'patients',
  initialState,
  extraReducers: (builder) => {
    // Fetch Patients
    builder.addCase(getPatients.pending, (state) => {
      state.patients_loading = true;
      state.patients_err = '';
    });
    builder.addCase(getPatients.fulfilled, (state, action) => {
      state.patients_loading = false;
      state.patients_data = action.payload;
      state.patients_err = '';
    });
    builder.addCase(getPatients.rejected, (state, action) => {
      state.patients_loading = false;
      state.patients_err = action.payload || 'The server is unreachable, Please check your API.';
    });

    // Post Patient
    builder.addCase(postPatient.pending, (state) => {
      state.patients_loading = true;
      state.patients_err = '';
    });
    builder.addCase(postPatient.fulfilled, (state, action) => {
      state.patients_loading = false;
      state.patients_data = [...state.patients_data, action.payload];
    });
    builder.addCase(postPatient.rejected, (state, action) => {
      state.patients_loading = false;
      state.patients_err = action.payload || 'An error occurred while adding a patient.'; // Use action.payload
    });

    // Update Patient
    // builder.addCase(updatePatient.pending, (state) => {
    //   state.patients_loading = true;
    //   state.patients_err = "";
    // });
    // builder.addCase(updatePatient.fulfilled, (state, action) => {
    //   state.patients_loading = false;
    //   state.patients_data = state.patients_data.map((patient) =>
    //     patient.id === action.payload.id ? action.payload : patient
    //   );
    // });
    // builder.addCase(updatePatient.rejected, (state, action) => {
    //   state.patients_loading = false;
    //   state.patients_err = action.payload;
    // });

    // Delete Patient
    builder.addCase(deletePatient.pending, (state) => {
      state.patients_loading = true;
      state.patients_err = '';
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.patients_loading = false;
      state.patients_data = state.patients_data.filter((patient) => patient.id !== action.payload);
    });
    builder.addCase(deletePatient.rejected, (state, action) => {
      state.patients_loading = false;
      state.patients_err = action.payload || 'An error occurred while deleting a patient.'; // Use action.payload
    });
  },
});

export default PatientsSlice.reducer;
