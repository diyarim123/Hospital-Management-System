import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// URL
const URL = 'http://127.0.0.1:4000';

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${URL}/login`, { email, password });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Login failed");
      }
    }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/register`, {
        username,
        email,
        password,
        role,
      });

      return response.data;
    } catch (error) {
      console.error("Register API Error:", error.response?.data); // 🔍 Debugging
      return rejectWithValue(error.response?.data?.error || "Registration failed");
    }
  }
);

