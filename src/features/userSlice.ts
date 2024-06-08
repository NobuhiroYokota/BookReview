import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cookies } from 'react-cookie';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const response = await axios.get('https://railway.bookreview.techtrain.dev/users', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

interface UserState {
  name: string;
  iconUrl: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  name: '',
  iconUrl: '',
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.name = action.payload.name;
        state.iconUrl = action.payload.iconUrl;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user data';
      });
  },
});

export default userSlice.reducer;
