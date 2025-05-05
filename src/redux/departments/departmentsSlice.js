// importing redux
import { createSlice } from '@reduxjs/toolkit';

// import the fetch function
import { getDepartments, postDepartment, updateDepartment, deleteDepartment } from './departmentRequests';

const initialState = {
  departments_loading: false,
  departments_data: [],
  departments_err: '',
};

const DepartmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    reset: (state) => {
      state.departments_loading = false;
      state.departments_data = [];
      state.departments_err = '';
    },
  },
  extraReducers: (builder) => {
    // Fetch Departments
    builder.addCase(getDepartments.pending, (state) => {
      state.departments_loading = true;
      state.departments_err = '';
    });
    builder.addCase(getDepartments.fulfilled, (state, action) => {
      state.departments_loading = false;
      state.departments_data = action.payload.result;
      state.departments_err = '';
    });
    builder.addCase(getDepartments.rejected, (state, action) => {
      state.departments_loading = false;
      state.departments_err =
        action.payload.error || 'The server is unreachable, Please check your API.';
    });

    // Post Department
    builder.addCase(postDepartment.pending, (state) => {
      state.departments_loading = true;
      state.departments_err = '';
    });
    builder.addCase(postDepartment.fulfilled, (state, action) => {
      state.departments_loading = false;
      state.departments_data = [...state.departments_data, action.payload.data];
    });
    builder.addCase(postDepartment.rejected, (state, action) => {
      state.departments_loading = false;
      state.departments_err = action.payload.error || 'An error occurred while adding a department.';
    });

    // Update Department
    builder.addCase(updateDepartment.pending, (state) => {
      state.departments_loading = true;
      state.departments_err = '';
    });
    builder.addCase(updateDepartment.fulfilled, (state, action) => {
      state.departments_loading = false;
      state.departments_data = state.departments_data.map((department) =>
        department.department_id === action.payload.data.department_id ? action.payload.data : department
      );
    });
    builder.addCase(updateDepartment.rejected, (state, action) => {
      state.departments_loading = false;
      state.departments_err = action.payload.error;
    });

    // Delete Department
    builder.addCase(deleteDepartment.pending, (state) => {
      state.departments_loading = true;
      state.departments_err = '';
    });
    builder.addCase(deleteDepartment.fulfilled, (state, action) => {
      state.departments_loading = false;
      state.departments_data = state.departments_data.filter((department) => department.department_id !== action.payload);
    });
    builder.addCase(deleteDepartment.rejected, (state, action) => {
      state.departments_loading = false;
      state.departments_err = action.payload || 'An error occurred while deleting a department.';
    });
  },
});


export const { reset } = DepartmentsSlice.actions;
export default DepartmentsSlice.reducer;