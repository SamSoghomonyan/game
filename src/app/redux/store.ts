import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { backendAPI } from './api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendAPI.middleware),
});

export type StateSchema = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
