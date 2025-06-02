import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, fetchAdminAPI } from "../../api/authAPI";

// Thunk: Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await loginAPI(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Thunk: Fetch Admin Data
export const fetchAdmin = createAsyncThunk(
  "auth/",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      if (!token) throw new Error("No token found!");

      const data = await fetchAdminAPI(token);
      localStorage.setItem("admin", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch admin data");
    }
  }
);

// Redux Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    admin: (() => {
      try {
        return JSON.parse(localStorage.getItem("admin")) || null;
      } catch {
        return null;
      }
    })(),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.admin = null;
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.admin = action.payload.admin;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
