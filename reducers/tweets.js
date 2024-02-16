import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

// text, date, author, nombreLikes, trend

export const userSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    getTweets: (state, action) => {
      state.value = [...action.payload];
    },
  },
});

export const { getTweets } = userSlice.actions;
export default userSlice.reducer;
