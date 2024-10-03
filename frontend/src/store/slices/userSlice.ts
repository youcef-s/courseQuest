import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserProfile } from "../../lib/api";

interface UserData {
  _id: number;
  username: string;
  firstName: string;
  lastName: string;
}

interface UserState {
  value: number;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  value: 0,
  userData: null,
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  fetchUserProfile,
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.loading = false;
          state.userData = action.payload;
        },
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user data";
      });
  },
});

export default userSlice.reducer;
