import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const setAutHeader = value => {
  axios.defaults.headers.common.Authorization = value;
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thukAPI) => {
    try {
      const resp = await axios.post('/users/signup', credentials);

      setAutHeader(`Bearer ${resp.data.token}`);

      return resp.data;
    } catch (error) {
      return thukAPI.rejectWithValue(error.message);
    }
    // console.log('register', credentials);
  }
);

// airazur2710@gmail.com
//     1234567
// airazur2701@gmail.com
//     1234567

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thukAPI) => {
    try {
      const resp = await axios.post('/users/login', credentials);
      //   console.log(resp.data.token);
      setAutHeader(`Bearer ${resp.data.token}`);
      //   axios.defaults.headers.common.Authorization = `Bearer ${resp.data.token}`;

      return resp.data;
    } catch (error) {
      return thukAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post('/users/logout');
  setAutHeader('');
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thukAPI) => {
    try {
      // console.log(thukAPI.getState());
      const reduxState = thukAPI.getState();
      setAutHeader(`Bearer ${reduxState.auth.token}`);
      const resp = await axios.get('/users/current');
      return resp.data;
    } catch (error) {
      return thukAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thukAPI) => {
      const reduxState = thukAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
);
