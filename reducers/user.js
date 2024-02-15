import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, userName: null, firstName: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
        // if login, 2 trucs, if sign up, 3 trucs
      state.value.token = action.payload.token;
      state.value.userName = action.payload.userName;
      if (state.value.firstName) {
        state.value.firstName = action.payload.firstName;
      }
      
    },
    logout: (state) => {
      state.value.token = null;
      state.value.userName = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
