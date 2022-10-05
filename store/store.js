import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunk from "redux-thunk";

import { authReducer } from './authSlice';

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    // any other reducers here
  }),
  middleware: [thunk],
});