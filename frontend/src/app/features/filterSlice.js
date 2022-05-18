import { createSlice } from '@reduxjs/toolkit';

/**
 * States and reducers to control the player's display filter.
 */
export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    name: '',
    currentClub: '',
    previousClub: '',
    position: '',
    birthDate: '',
  },
  reducers: {
    // Control the character input for the "Name" field
    writeName: (state, action) => {
      state.name = action.payload;
    },
    // Control the character input for the "Current club" field
    writeCurrentClub: (state, action) => {
      state.currentClub = action.payload;
    },
    // Control the character input for the "Previous club" field
    writePreviousClub: (state, action) => {
      state.previousClub = action.payload;
    },
    // Control the character input for the "Position" field
    writePosition: (state, action) => {
      state.position = action.payload;
    },
    // Control the character input for the "Birth year" field
    writeBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
  },
});

export const {
  writeName,
  writeCurrentClub,
  writePreviousClub,
  writePosition,
  writeBirthDate,
} = filterSlice.actions;

export default filterSlice.reducer;
