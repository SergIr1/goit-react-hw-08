import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './operations';

const slice = createSlice({
  name: `auth`,
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoadingIn: false,
    error: null,
  },
  // reducers: {
  //   clearError: state => {
  //     state.error = null;
  //   },
  // },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoadingIn = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoadingIn = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoadingIn = false;
        state.error = action.payload;
        // console.log(state.error);
      })
      .addCase(login.pending, state => {
        state.isLoadingIn = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoadingIn = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoadingIn = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, state => {
        state.isLoadingIn = true;
      })
      .addCase(logout.fulfilled, state => {
        state.isLoadingIn = false;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export default slice.reducer;

export const { clearError } = slice.actions;
