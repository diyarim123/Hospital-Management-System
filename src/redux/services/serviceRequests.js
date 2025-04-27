// importing createAsyncThunk
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL
const URL = 'http://127.0.0.1:4000/services';

export const getServices = createAsyncThunk(
  'services/fetch',
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

export const postService = createAsyncThunk(
  'services/post',
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
      return rejectWithValue(err.response?.error || 'Error posting service');
    }
  }
);

export const updateService = createAsyncThunk(
  'services/update',
  async (data, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Get token from Redux store

      const response = await axios.patch(`${URL}/${data.service_id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Attach token
        },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.error || 'Error updating service');
    }
  }
);

export const deleteService = createAsyncThunk(
  'services/delete',
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
        throw new Error('Failed to delete service');
      }


      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
