import { createSlice } from '@reduxjs/toolkit';

/**
 * States and reducers to control the plaeyr's display list on home page.
 */
export const playerListSlice = createSlice({
  name: 'playerList',
  initialState: {
    players: [],
  },
  reducers: {
    // Fill in the players list (to be used on page load)
    setPlayers: (state, action) => {
      state.players = action.payload.map((player) => ({
        ...player,
        visible: true,
      }));
    },
    // Select the players to display acording to the filter
    filterPlayers: (state, action) => {
      if (!(action.payload instanceof Object)) return;
      state.players = state.players.map((player) => {
        // Lower-case payload value to make the filter case-insensitive
        const lowerCaseValue = action.payload.value.toLowerCase();
        const { field } = action.payload;
        // As "previousClubs" is an array, we must seek inside of it
        if (field === 'previousClubs') {
          const listOfCandidates = player.previousClubs.filter((club) => {
            return club.toLowerCase().includes(lowerCaseValue);
          });
          return {
            ...player,
            visible: listOfCandidates.length > 0
          };
        }

        // The "name" search attribute seeks for both firstName and lastName
        if (field === 'firstName' || field === 'lastName') {
          return {
            ...player,
            visible: (
              player.firstName.toLowerCase().includes(lowerCaseValue)
              || player.lastName.toLowerCase().includes(lowerCaseValue)
            )
          };
        }
        return {
          ...player,
          visible: player[field].toLowerCase().includes(lowerCaseValue)
        };
      });
    },
  },
});

export const { setPlayers, filterPlayers } = playerListSlice.actions;

export default playerListSlice.reducer;
