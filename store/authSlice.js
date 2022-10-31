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
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true
        }
      }
    },
    logOutUser: (state) => {
      return {
        ...state,
        user: {},
        isAuthenticated: false
      }
    },
  },
})

export const { logOutUser, updateUserData } = authSlice.actions;

export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getUser = (state) => state.auth.user;

export const authReducer = authSlice.reducer;