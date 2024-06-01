import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface BookReview {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
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
  const response = await axios.get(`https://railway.bookreview.techtrain.dev/public/books?offset=${offset}`);
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