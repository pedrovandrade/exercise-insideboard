import { configureStore } from '@reduxjs/toolkit';
import filterReducer from 'app/features/filterSlice';
import playerListReducer from 'app/features/playerListSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    display: playerListReducer,
  },
});
