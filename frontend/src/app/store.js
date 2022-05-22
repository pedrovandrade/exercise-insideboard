import { configureStore } from '@reduxjs/toolkit';
import filterReducer from 'app/features/filterSlice';
import addPlayerReducer from 'app/features/addPanelSlice';
import playerListReducer from 'app/features/playerListSlice';

export default configureStore({
  reducer: {
    addPlayer: addPlayerReducer,
    filter: filterReducer,
    display: playerListReducer,
  },
});
