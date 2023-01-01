import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    setIsAuthenticated: (state, action) => {
      return {
        ...state,
        isAuthenticated: action.payload,
        user: (action.payload == null ? null : state.user),
      }
    },
    setUserData: (state, action) => {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: (action.payload != null)
      }
    },
  },
})

export const { setUserData, setIsAuthenticated } = authSlice.actions;

export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const user = (state) => state.auth.user;

export const userId = (state) => state.auth?.user?.id;
export const userEmail = (state) => state.auth?.user?.email;

export const authReducer = authSlice.reducer;