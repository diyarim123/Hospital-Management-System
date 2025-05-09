// importing createAsyncThunk
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL
const URL = 'http://127.0.0.1:4000/medical-records';

export const getMedicals = createAsyncThunk(
  'medical/fetch',
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

export const postMedical = createAsyncThunk(
  'medical/post',
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
      return rejectWithValue(err.response?.data || 'Error posting medical');
    }
  }
);

export const updateMedical = createAsyncThunk(
  'medical/update',
  async (data, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Get token from Redux store

      console.log("the url" , `${URL}/${data.record_id}`); 


      const response = await axios.patch(`${URL}/${data.record_id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Attach token
        },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error updating medical');
    }
  }
);

export const deleteMedical = createAsyncThunk(
  'medical/delete',
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
        throw new Error('Failed to delete medical');
      }


      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
