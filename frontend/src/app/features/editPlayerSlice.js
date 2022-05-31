import { createSlice } from '@reduxjs/toolkit';

/**
 * States and reducers to control the player's edit fields.
 */
export const editPlayerSlice = createSlice({
  name: 'filter',
  initialState: {
    player: {
      firstName: '',
      lastName: '',
      club: '',
      previousClubs: [],
      position: '',
      birth: '',
      uuid: '',
    },
  },
  reducers: {
    // Control the character input for the "firstName" field
    writeFirstName: (state, action) => {
      state.player.firstName = action.payload;
    },
    // Control the character input for the "lastName" field
    writeLastName: (state, action) => {
      state.player.lastName = action.payload;
    },
    // Control the character input for the "Current club" field
    writeCurrentClub: (state, action) => {
      state.player.club = action.payload;
    },
    // Control the character input for the "Previous club" field
    writePreviousClubs: (state, action) => {
      state.player.previousClubs = [
        ...state.player.previousClubs.slice(0, action.payload.index),
        action.payload.value,
        ...state.player.previousClubs.slice(action.payload.index + 1)
      ];
    },
    // Control the character input for the "Position" field
    writePosition: (state, action) => {
      state.player.position = action.payload;
    },
    // Control the character input for the "Birth year" field
    writeBirthDate: (state, action) => {
      state.player.birth = action.payload;
    },
    // Set the recovered players' UUID
    setUUID: (state, action) => {
      state.player.uuid = action.payload;
    },
  },
});

export const {
  writeFirstName,
  writeLastName,
  writeCurrentClub,
  writePreviousClubs,
  writePosition,
  writeBirthDate,
  setUUID,
} = editPlayerSlice.actions;

export default editPlayerSlice.reducer;
