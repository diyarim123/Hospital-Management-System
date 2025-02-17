// importing createAsyncThunk
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL
const URL = 'http://127.0.0.1:4000/patients';

export const getPatients = createAsyncThunk('patients/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (err) {
    return rejectWithValue('Server is unreachable. Please check your API.');
  }
});

export const postPatient = createAsyncThunk('patients/post', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const deletePatient = createAsyncThunk(
  'patients/deletePatient',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete patient');
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
