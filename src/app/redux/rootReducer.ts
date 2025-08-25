import { combineReducers } from '@reduxjs/toolkit';
import { backendAPI } from './api';
import { carReducer } from '@/etities/Car';
import { winnerReducer } from '@/etities/Winner';

export const rootReducer = combineReducers({
  car: carReducer,
  winner: winnerReducer,
  [backendAPI.reducerPath]: backendAPI.reducer,
});
