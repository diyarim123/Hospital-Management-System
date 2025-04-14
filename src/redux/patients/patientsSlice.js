// importing redux
import { createSlice, current } from '@reduxjs/toolkit';

// import the fetch function
import { getPatients, postPatient, updatePatient, deletePatient } from './patientRequests';

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
      state.patients_data = action.payload.result;
      state.patients_err = '';
    });
    builder.addCase(getPatients.rejected, (state, action) => {
      state.patients_loading = false;
      state.patients_err =
        action.payload.error || 'The server is unreachable, Please check your API.';
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
      state.patients_err = action.payload.error || 'An error occurred while adding a patient.';
    });

    // Update Patient
    builder.addCase(updatePatient.pending, (state) => {
      state.patients_loading = true;
      state.patients_err = '';
    });
    builder.addCase(updatePatient.fulfilled, (state, action) => {
      state.patients_loading = false;
      state.patients_data = state.patients_data.map((patient) =>
        patient.patient_id === action.payload.data.patient_id ? action.payload.data : patient
      );
    });
    builder.addCase(updatePatient.rejected, (state, action) => {
      state.patients_loading = false;
      state.patients_err = action.payload.error;
    });

    // Delete Patient
    builder.addCase(deletePatient.pending, (state) => {
      state.patients_loading = true;
      state.patients_err = '';
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.patients_loading = false;
      state.patients_data = state.patients_data.filter((patient) => patient.patient_id !== action.payload);
    });
    builder.addCase(deletePatient.rejected, (state, action) => {
      state.patients_loading = false;
      state.patients_err = action.payload || 'An error occurred while deleting a patient.';
    });
  },
});

export default PatientsSlice.reducer;
