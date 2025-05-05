// importing redux
import { createSlice } from '@reduxjs/toolkit';

// import the fetch function
import { getMedicals, postMedical, updateMedical, deleteMedical } from './medicalRequests';

const initialState = {
  medicals_loading: false,
  medicals_data: [],
  medicals_err: '',
};

const MedicalSlice = createSlice({
  name: 'medical',
  initialState,
  reducers: {
    reset: (state) => {
      state.medicals_loading = false;
      state.medicals_data = [];
      state.medicals_err = '';
    },
  },
  extraReducers: (builder) => {
    // Fetch Medicals
    builder.addCase(getMedicals.pending, (state) => {
      state.medicals_loading = true;
      state.medicals_err = '';
    });
    builder.addCase(getMedicals.fulfilled, (state, action) => {
      state.medicals_loading = false;
      state.medicals_data = action.payload.result;
      state.medicals_err = '';
    });
    builder.addCase(getMedicals.rejected, (state, action) => {
      state.medicals_loading = false;
      state.medicals_err =
        action.payload.error || 'The server is unreachable, Please check your API.';
    });

    // Post Medical
    builder.addCase(postMedical.pending, (state) => {
      state.medicals_loading = true;
      state.medicals_err = '';
    });
    builder.addCase(postMedical.fulfilled, (state, action) => {
      state.medicals_loading = false;
      state.medicals_data = [...state.medicals_data, action.payload.data];
    });
    builder.addCase(postMedical.rejected, (state, action) => {
      state.medicals_loading = false;
      state.medicals_err = action.payload.error || 'An error occurred while adding a medical.';
    });

    // Update Medical
    builder.addCase(updateMedical.pending, (state) => {
      state.medicals_loading = true;
      state.medicals_err = '';
    });
    builder.addCase(updateMedical.fulfilled, (state, action) => {
      state.medicals_loading = false;
      state.medicals_data = state.medicals_data.map((medical) =>
        medical.record_id === action.payload.data.record_id ? action.payload.data : medical
      );
    });
    builder.addCase(updateMedical.rejected, (state, action) => {
      state.medicals_loading = false;
      state.medicals_err = action.payload.error;
    });

    // Delete Medical
    builder.addCase(deleteMedical.pending, (state) => {
      state.medicals_loading = true;
      state.medicals_err = '';
    });
    builder.addCase(deleteMedical.fulfilled, (state, action) => {
      state.medicals_loading = false;
      state.medicals_data = state.medicals_data.filter((medical) => medical.record_id !== action.payload);
    });
    builder.addCase(deleteMedical.rejected, (state, action) => {
      state.medicals_loading = false;
      state.medicals_err = action.payload || 'An error occurred while deleting a medical.';
    });
  },
});

export const { reset } = MedicalSlice.actions;
export default MedicalSlice.reducer;
