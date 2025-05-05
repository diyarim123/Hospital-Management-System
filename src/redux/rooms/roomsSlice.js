// importing redux
import { createSlice } from '@reduxjs/toolkit';

// import the fetch function
import { getRooms, postRoom, updateRoom, deleteRoom } from './roomRequests';

const initialState = {
  rooms_loading: false,
  rooms_data: [],
  rooms_err: '',
};

const RoomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    reset: (state) => {
      state.rooms_loading = false;
      state.rooms_data = [];
      state.rooms_err = '';
    },
  },
  extraReducers: (builder) => {
    // Fetch Rooms
    builder.addCase(getRooms.pending, (state) => {
      state.rooms_loading = true;
      state.rooms_err = '';
    });
    builder.addCase(getRooms.fulfilled, (state, action) => {
      state.rooms_loading = false;
      state.rooms_data = action.payload.result;
      state.rooms_err = '';
    });
    builder.addCase(getRooms.rejected, (state, action) => {
      state.rooms_loading = false;
      state.rooms_err =
        action.payload.error || 'The server is unreachable, Please check your API.';
    });

    // Post Room
    builder.addCase(postRoom.pending, (state) => {
      state.rooms_loading = true;
      state.rooms_err = '';
    });
    builder.addCase(postRoom.fulfilled, (state, action) => {
      state.rooms_loading = false;
      state.rooms_data = [...state.rooms_data, action.payload.data];
    });
    builder.addCase(postRoom.rejected, (state, action) => {
      state.rooms_loading = false;
      state.rooms_err = action.payload.error || 'An error occurred while adding a room.';
    });

    // Update Room
    builder.addCase(updateRoom.pending, (state) => {
      state.rooms_loading = true;
      state.rooms_err = '';
    });
    builder.addCase(updateRoom.fulfilled, (state, action) => {
      state.rooms_loading = false;
      state.rooms_data = state.rooms_data.map((room) =>
        room.room_id === action.payload.data.room_id ? action.payload.data : room
      );
    });
    builder.addCase(updateRoom.rejected, (state, action) => {
      state.rooms_loading = false;
      state.rooms_err = action.payload.error;
    });

    // Delete Room
    builder.addCase(deleteRoom.pending, (state) => {
      state.rooms_loading = true;
      state.rooms_err = '';
    });
    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      state.rooms_loading = false;
      state.rooms_data = state.rooms_data.filter((room) => room.room_id !== action.payload);
    });
    builder.addCase(deleteRoom.rejected, (state, action) => {
      state.rooms_loading = false;
      state.rooms_err = action.payload || 'An error occurred while deleting a room.';
    });
  },
});

export const { reset } = RoomsSlice.actions;
export default RoomsSlice.reducer;
