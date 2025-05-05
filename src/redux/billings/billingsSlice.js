// importing redux
import { createSlice } from '@reduxjs/toolkit';

// import the fetch function
import { getBillings, postBilling, updateBilling, deleteBilling } from './billingRequests';

const initialState = {
  billings_loading: false,
  billings_data: [],
  billings_err: '',
};

const BillingsSlice = createSlice({
  name: 'billings',
  initialState,
  reducers: {
    reset: (state) => {
      state.billings_loading = false;
      state.billings_data = [];
      state.billings_err = '';
    },
  },
  extraReducers: (builder) => {
    // Fetch Billings
    builder.addCase(getBillings.pending, (state) => {
      state.billings_loading = true;
      state.billings_err = '';
    });
    builder.addCase(getBillings.fulfilled, (state, action) => {
      state.billings_loading = false;
      state.billings_data = action.payload.result;
      state.billings_err = '';
    });
    builder.addCase(getBillings.rejected, (state, action) => {
      state.billings_loading = false;
      state.billings_err =
        action.payload.error || 'The server is unreachable, Please check your API.';
    });

    // Post Billing
    builder.addCase(postBilling.pending, (state) => {
      state.billings_loading = true;
      state.billings_err = '';
    });
    builder.addCase(postBilling.fulfilled, (state, action) => {
      state.billings_loading = false;
      state.billings_data = [...state.billings_data, action.payload.data];
    });
    builder.addCase(postBilling.rejected, (state, action) => {
      state.billings_loading = false;
      state.billings_err = action.payload.error || 'An error occurred while adding a bill.';
    });

    // Update Billing
    builder.addCase(updateBilling.pending, (state) => {
      state.billings_loading = true;
      state.billings_err = '';
    });
    builder.addCase(updateBilling.fulfilled, (state, action) => {
      state.billings_loading = false;
      state.billings_data = state.billings_data.map((bill) =>
        bill.bill_id === action.payload.data.bill_id ? action.payload.data : bill
      );
    });
    builder.addCase(updateBilling.rejected, (state, action) => {
      state.billings_loading = false;
      state.billings_err = action.payload.error;
    });

    // Delete Billing
    builder.addCase(deleteBilling.pending, (state) => {
      state.billings_loading = true;
      state.billings_err = '';
    });
    builder.addCase(deleteBilling.fulfilled, (state, action) => {
      state.billings_loading = false;
      state.billings_data = state.billings_data.filter((bill) => bill.bill_id !== action.payload);
    });
    builder.addCase(deleteBilling.rejected, (state, action) => {
      state.billings_loading = false;
      state.billings_err = action.payload || 'An error occurred while deleting a bill.';
    });
  },
});

export const { reset } = BillingsSlice.actions;
export default BillingsSlice.reducer;
