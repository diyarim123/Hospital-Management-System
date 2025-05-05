// importing redux
import { createSlice } from '@reduxjs/toolkit';

// import the fetch function
import { getStaff, postStaff, updateStaff, deleteStaff } from './staffRequests';

const initialState = {
  staff_loading: false,
  staff_data: [],
  staff_err: '',
};

const StaffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    reset: (state) => {
      state.staff_loading = false;
      state.staff_data = [];
      state.staff_err = '';
    },
  },
  extraReducers: (builder) => {
    // Fetch Staff
    builder.addCase(getStaff.pending, (state) => {
      state.staff_loading = true;
      state.staff_err = '';
    });
    builder.addCase(getStaff.fulfilled, (state, action) => {
      state.staff_loading = false;
      state.staff_data = action.payload.result;
      state.staff_err = '';
    });
    builder.addCase(getStaff.rejected, (state, action) => {
      state.staff_loading = false;
      state.staff_err = action.payload.error || 'The server is unreachable, Please check your API.';
    });

    // Post Staff
    builder.addCase(postStaff.pending, (state) => {
      state.staff_loading = true;
      state.staff_err = '';
    });
    builder.addCase(postStaff.fulfilled, (state, action) => {
      state.staff_loading = false;
      state.staff_data = [...state.staff_data, action.payload.data];
    });
    builder.addCase(postStaff.rejected, (state, action) => {
      state.staff_loading = false;
      state.staff_err = action.payload.error || 'An error occurred while adding a staff.';
    });

    // Update Staff
    builder.addCase(updateStaff.pending, (state) => {
      state.staff_loading = true;
      state.staff_err = '';
    });
    builder.addCase(updateStaff.fulfilled, (state, action) => {
      state.staff_loading = false;
      state.staff_data = state.staff_data.map((staff) =>
        staff.staff_id === action.payload.data.staff_id ? action.payload.data : staff
      );
    });
    builder.addCase(updateStaff.rejected, (state, action) => {
      state.staff_loading = false;
      state.staff_err = action.payload.error;
    });

    // Delete Staff
    builder.addCase(deleteStaff.pending, (state) => {
      state.staff_loading = true;
      state.staff_err = '';
    });
    builder.addCase(deleteStaff.fulfilled, (state, action) => {
      state.staff_loading = false;
      state.staff_data = state.staff_data.filter((staff) => staff.staff_id !== action.payload);
    });
    builder.addCase(deleteStaff.rejected, (state, action) => {
      state.staff_loading = false;
      state.staff_err = action.payload || 'An error occurred while deleting a staff.';
    });
  },
});

export const { reset } = StaffSlice.actions;
export default StaffSlice.reducer;
