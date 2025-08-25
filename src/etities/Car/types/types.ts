import { ColorHEXString } from '@/shared/types/types';
import { EngineDriveMode, EngineResponse } from '@/etities/Engine';

export type CarID = number;

export type CarRequest = {
  name?: string; // car name (optional)
  color?: ColorHEXString; // hex color string
};

export type CarResponse = CarRequest & {
  id: CarID;
};

export type CarEngineData = CarResponse &
  EngineResponse & {
  drive?: EngineDriveMode | null; // current drive mode
  translateX?: number | string | null; // movement (px or %)
};

// redux slice state for cars
export type InitialState = {
  carSelected: CarEngineData | null; // the one we clicked
  cars: {
    [id: CarID]: CarEngineData;
  } | null; // all cars (dictionary)
  carIDs: CarID[] | null; // list of ids for easy loop
  carsQueryParams: CarsQueryParams; // pagination params
};

// backend query param names
export enum CarsParams {
  PAGE = '_page',
  LIMIT = '_limit',
}

export type CarsQueryParams = {
  [CarsParams.PAGE]: number | null; // page number
  [CarsParams.LIMIT]: number | null; // page size
};
