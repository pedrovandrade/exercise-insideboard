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
        const { field } = action.payload;
        // As "previousClubs" is an array, we must seek inside of it
        if (field === 'previousClubs') {
          const listOfCandidates = player.previousClubs.filter((club) => {
            return club.includes(action.payload.value);
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
              player.firstName.includes(action.payload.value)
              || player.lastName.includes(action.payload.value)
            )
          };
        }
        return {
          ...player,
          visible: player[field].includes(action.payload.value)
        };
      });
    },
  },
});

export const { setPlayers, filterPlayers } = playerListSlice.actions;

export default playerListSlice.reducer;
