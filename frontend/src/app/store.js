import { configureStore } from '@reduxjs/toolkit';
import filterReducer from 'app/features/filterSlice';
import addPlayerReducer from 'app/features/addPanelSlice';
import playerListReducer from 'app/features/playerListSlice';
import editPlayerReducer from 'app/features/editPlayerSlice';
import networkReducer from 'app/features/networkSlice';

export default configureStore({
  reducer: {
    addPlayer: addPlayerReducer,
    filter: filterReducer,
    display: playerListReducer,
    edit: editPlayerReducer,
    network: networkReducer,
  },
});
