import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tweets: [],
};

// text, date, author, nombreLikes, trend

export const userSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    getTweets: (state, action) => {
      console.log('getTweets payload: ', action.payload);
      state.tweets = [...action.payload];
    },
    addTweets: (state) => {
      console.log(state);
    },
    deleteTweets: (state) => {
        console.log(state);
    }
  },
});

export const { getTweets, addTweets, deleteTweets } = userSlice.actions;
export default userSlice.reducer;
