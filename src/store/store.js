import { configureStore } from '@reduxjs/toolkit';
import petsReducer from './petsSlice';

const store = configureStore({
  reducer: {
    pets: petsReducer,
  },
});

export default store;
