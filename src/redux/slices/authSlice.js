import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.authData = action.payload;
    },
    clearAuthData: (state) => {
      state.authData = null;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export const selectAuthData = (state) => state.auth.authData;
export default authSlice.reducer;