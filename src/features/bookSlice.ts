import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from 'react-cookie';

interface BookReview {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine:boolean;
}

interface BookState{
  reviews: BookReview[];
  offset: number;
  error: string | null;
  status:'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState:BookState = {
  reviews: [],
  offset:0,
  error: null,
  status:'idle'
};


export const fetchBooks = createAsyncThunk('books/fetchBooks', async(offset:number)=>{
  const cookies = new Cookies();
  const token = cookies.get('token');
  const response = await axios.get(`https://railway.bookreview.techtrain.dev/books?offset=${offset}`,{
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
  return response.data;
});

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    increamentOffset: (state)=>{
      state.offset += 10;
    },
    decreamentOffset: (state)=>{
      if(state.offset > 0){
        state.offset -=10;
      }
    },
  },
extraReducers:(builder)=>
  builder
  .addCase(fetchBooks.fulfilled,(state , action:PayloadAction<BookReview[]>)=>{
    state.status = 'succeeded';
    state.reviews = action.payload;
  })
  .addCase(fetchBooks.rejected,(state,action)=>{
    state.status = 'failed';
    state.error =action.error.message || null;
  })
}
);

export const { increamentOffset , decreamentOffset }  = bookSlice.actions;

export default bookSlice.reducer;