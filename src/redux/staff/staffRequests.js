// importing createAsyncThunk
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL
const URL = 'http://127.0.0.1:4000/staff';

export const getStaff = createAsyncThunk(
  'staff/fetch',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Get token from Redux store

      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to request
        },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue('Server is unreachable. Please check your API.');
    }
  }
);

export const postStaff = createAsyncThunk(
  'staff/post',
  async (data, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Get token from Redux store

      const response = await axios.post(URL, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Attach token
        },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error posting staff');
    }
  }
);

export const updateStaff = createAsyncThunk(
  'staff/update',
  async (data, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Get token from Redux store

      const response = await axios.patch(`${URL}/${data.staff_id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Attach token
        },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error updating staff');
    }
  }
);

export const deleteStaff = createAsyncThunk(
  'staff/delete',
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Get token from Redux store

      const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete staff');
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
