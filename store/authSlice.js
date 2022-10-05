import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    updateUserData: (state, action) => {
      if (action.payload != null) {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    },
    logOutUser: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
})

export const { logOutUser, updateUserData } = authSlice.actions;

export const authReducer = authSlice.reducer;