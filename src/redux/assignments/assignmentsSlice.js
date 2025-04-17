// importing redux
import { createSlice } from '@reduxjs/toolkit';

// import the fetch function
import { getAssignments, postAssignment, updateAssignment, deleteAssignment } from './assignmentRequests';

const initialState = {
  assignments_loading: false,
  assignments_data: [],
  assignments_err: '',
};

const AssignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  extraReducers: (builder) => {
    // Fetch assignments
    builder.addCase(getAssignments.pending, (state) => {
      state.assignments_loading = true;
      state.assignments_err = '';
    });
    builder.addCase(getAssignments.fulfilled, (state, action) => {
      state.assignments_loading = false;
      state.assignments_data = action.payload.result;
      state.assignments_err = '';
    });
    builder.addCase(getAssignments.rejected, (state, action) => {
      state.assignments_loading = false;
      state.assignments_err =
        action.payload.error || 'The server is unreachable, Please check your API.';
    });

    // Post assignments
    builder.addCase(postAssignment.pending, (state) => {
      state.assignments_loading = true;
      state.assignments_err = '';
    });
    builder.addCase(postAssignment.fulfilled, (state, action) => {
      state.assignments_loading = false;
      state.assignments_data = [...state.assignments_data, action.payload.data];
    });
    builder.addCase(postAssignment.rejected, (state, action) => {
      state.assignments_loading = false;
      state.assignments_err = action.payload.error || 'An error occurred while adding a assignment.';
    });

    // Update assignments
    builder.addCase(updateAssignment.pending, (state) => {
      state.assignments_loading = true;
      state.assignments_err = '';
    });
    builder.addCase(updateAssignment.fulfilled, (state, action) => {
      state.assignments_loading = false;
      state.assignments_data = state.assignments_data.map((assignment) =>
        assignment.assignment_id === action.payload.data.assignment_id ? action.payload.data : assignment
      );
    });
    builder.addCase(updateAssignment.rejected, (state, action) => {
      state.assignments_loading = false;
      state.assignments_err = action.payload.error;
    });

    // Delete assignments
    builder.addCase(deleteAssignment.pending, (state) => {
      state.assignments_loading = true;
      state.assignments_err = '';
    });
    builder.addCase(deleteAssignment.fulfilled, (state, action) => {
      state.assignments_loading = false;
      state.assignments_data = state.assignments_data.filter((assignment) => assignment.assignment_id !== action.payload);
    });
    builder.addCase(deleteAssignment.rejected, (state, action) => {
      state.assignments_loading = false;
      state.assignments_err = action.payload || 'An error occurred while deleting a assignment.';
    });
  },
});

export default AssignmentsSlice.reducer;
