import { createSlice } from '@reduxjs/toolkit';

/**
 * States and reducers to control the player's edit fields.
 */
export const networkSlice = createSlice({
  name: 'filter',
  initialState: {
    apiUrl: 'http://localhost:8080',
  },
  reducers: {
    // Change the API base URL
    changeApiUrl: (state, action) => {
      state.apiUrl = action.payload;
    },
  },
});

export const {
  changeApiUrl,
} = networkSlice.actions;

export default networkSlice.reducer;
