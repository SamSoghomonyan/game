import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CarEngineData,
  CarID,
  CarsParams,
  CarsQueryParams,
  InitialState,
} from '../types/types';

const initialState: InitialState = {
  carSelected: null,
  cars: null,
  carIDs: null,
  carsQueryParams: {
    [CarsParams.PAGE]: 1,
    [CarsParams.LIMIT]: 7,
  },
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<CarEngineData[]>) => {
      // reset first
      state.cars = {};
      state.carIDs = [];

      // add cars one by one
      action.payload.forEach((car) => {
        if (state.cars) {
          state.cars[car.id] = car;
        }
        if (state.carIDs) {
          state.carIDs.push(car.id);
        }
      });
    },

    selectCar: (state, action: PayloadAction<CarID | null>) => {
      if (action.payload === null) {
        state.carSelected = null;
      } else {
        if (state.cars) {
          state.carSelected = state.cars[action.payload] || null;
        } else {
          state.carSelected = null;
        }
      }
    },

    addCar: (state, action: PayloadAction<CarEngineData>) => {
      if (!state.cars) {
        state.cars = {};
      }
      if (!state.carIDs) {
        state.carIDs = [];
      }

      state.cars[action.payload.id] = action.payload;
      state.carIDs.push(action.payload.id);
    },

    mutateCar: (state, action: PayloadAction<CarEngineData>) => {
      if (state.cars) {
        const currentCar = state.cars[action.payload.id];
        if (currentCar) {
          state.cars[action.payload.id] = {
            ...currentCar,
            ...action.payload,
          };
        }
      }
    },

    deleteCar: (state, action: PayloadAction<CarID>) => {
      if (state.cars && state.carIDs) {
        delete state.cars[action.payload];
        state.carIDs = state.carIDs.filter((id) => id !== action.payload);
      }
    },

    mutateCarsQueryParams: (
      state,
      action: PayloadAction<Partial<CarsQueryParams>>
    ) => {
      state.carsQueryParams = {
        ...state.carsQueryParams,
        ...action.payload,
      };
    },
  },
});

export const carReducer = carSlice.reducer;
export const carActions = carSlice.actions;
