// importing redux
import { createSlice } from '@reduxjs/toolkit';

// import the fetch function
import { getServices, postService, updateService, deleteService } from './serviceRequests';

const initialState = {
  services_loading: false,
  services_data: [],
  services_err: '',
};

const ServicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    reset: (state) => {
      state.services_loading = false;
      state.services_data = [];
      state.services_err = '';
    },
  },
  extraReducers: (builder) => {
    // Fetch services
    builder.addCase(getServices.pending, (state) => {
      state.services_loading = true;
      state.services_err = '';
    });
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.services_loading = false;
      state.services_data = action.payload.result;
      state.services_err = '';
    });
    builder.addCase(getServices.rejected, (state, action) => {
      state.services_loading = false;
      state.services_err =
        action.payload.error || 'The server is unreachable, Please check your API.';
    });

    // Post service
    builder.addCase(postService.pending, (state) => {
      state.services_loading = true;
      state.services_err = '';
    });
    builder.addCase(postService.fulfilled, (state, action) => {
      state.services_loading = false;
      state.services_data = [...state.services_data, action.payload.data];
    });
    builder.addCase(postService.rejected, (state, action) => {
      state.services_loading = false;
      state.services_err = action.payload.error || 'An error occurred while adding a service.';
    });

    // Update service
    builder.addCase(updateService.pending, (state) => {
      state.services_loading = true;
      state.services_err = '';
    });
    builder.addCase(updateService.fulfilled, (state, action) => {
      state.services_loading = false;
      state.services_data = state.services_data.map((service) =>
        service.service_id === action.payload.data.service_id ? action.payload.data : service
      );
    });
    builder.addCase(updateService.rejected, (state, action) => {
      state.services_loading = false;
      state.services_err = action.payload.error;
    });

    // Delete service
    builder.addCase(deleteService.pending, (state) => {
      state.services_loading = true;
      state.services_err = '';
    });
    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.services_loading = false;
      state.services_data = state.services_data.filter((service) => service.service_id !== action.payload);
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      state.services_loading = false;
      state.services_err = action.payload || 'An error occurred while deleting a service.';
    });
  },
});

export const { reset } = ServicesSlice.actions;
export default ServicesSlice.reducer;
