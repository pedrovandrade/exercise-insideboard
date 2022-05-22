import { createSlice } from '@reduxjs/toolkit';

/**
 * States and reducers to control the player's display filter.
 */
export const addPanelSlice = createSlice({
  name: 'addPanel',
  initialState: {
    firstName: '',
    lastName: '',
    currentClub: '',
    previousClubStr: '',
    previousClubs: [],
    position: '',
    birthDate: '',
    pictureSelected: false,
  },
  reducers: {
    // Control the character input for the "First name" field
    writeFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    // Control the character input for the "Last name" field
    writeLastName: (state, action) => {
      state.lastName = action.payload;
    },
    // Control the character input for the "Current club" field
    writeCurrentClub: (state, action) => {
      state.currentClub = action.payload;
    },
    // Control the character input for the "Previous clubs" field
    writePreviousClubs: (state, action) => {
      state.previousClubStr = action.payload;
    },
    // Control the character input for the "Position" field
    writePosition: (state, action) => {
      state.position = action.payload;
    },
    // Control the character input for the "Birth year" field
    writeBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
    // Add a club to the list of the player's previous clubs
    addPreviousClub: (state, action) => {
      state.previousClubs = [...state.previousClubs, action.payload];
    },
    // Remove a club from the list of the player's previous clubs by using its
    // array index
    deletePreviousClub: (state, action) => {
      state.previousClubs = [
        ...state.previousClubs.slice(0, action.payload),
        ...state.previousClubs.slice(action.payload + 1)
      ];
    },
    // Tell if a picture was selected on the form to be sent to the backend
    setPictureSelected: (state, action) => {
      state.pictureSelected = action.payload;
    },
    // Flush away all the data, resetting the state to its initial value
    resetData: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.currentClub = '';
      state.previousClubStr = '';
      state.previousClubs = [];
      state.position = '';
      state.birthDate = '';
      state.pictureSelected = false;
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
  addPreviousClub,
  deletePreviousClub,
  setPictureSelected,
  resetData,
} = addPanelSlice.actions;

export default addPanelSlice.reducer;
