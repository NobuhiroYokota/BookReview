import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './src/features/authSlice';
import bookReducer from './src/features/bookSlice';
import userReducer from './src/features/userSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    books: bookReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
