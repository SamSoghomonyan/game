import { backendAPI } from '@/app/redux/api';
import { CarID, CarRequest, CarResponse, CarsQueryParams } from '../types/types';
import { API_TAGS } from '@/app/redux/api';

const GARAGE_URL = 'garage';

export const carAPI = backendAPI.injectEndpoints({
  endpoints: (build) => ({
    getCars: build.query<
      { data: CarResponse[]; totalCount: number },
      Partial<CarsQueryParams>
    >({
      query: (params) => {
        // filter null values manually (instead of fancy Object.fromEntries)
        const cleanParams: Record<string, unknown> = {};
        if (params) {
          for (const key in params) {
            if (params[key as keyof CarsQueryParams] !== null) {
              cleanParams[key] = params[key as keyof CarsQueryParams];
            }
          }
        }

        return {
          url: GARAGE_URL,
          params: cleanParams,
        };
      },

      transformResponse: (response: CarResponse[], meta) => {
        let totalCount = 0;
        if (meta && meta.response) {
          const headerValue = meta.response.headers.get('X-Total-Count');
          if (headerValue) {
            totalCount = parseInt(headerValue, 10);
          }
        }

        return { data: response, totalCount };
      },

      providesTags: (result) => {
        if (result) {
          return result.data.map((car) => ({
            type: API_TAGS.CAR,
            id: car.id,
          }));
        }
        return [API_TAGS.CAR];
      },
    }),

    getCar: build.query<CarResponse, CarID>({
      query: (id) => `${GARAGE_URL}/${id}`,
      providesTags: (_result, _error, id) => [{ type: API_TAGS.CAR, id }],
    }),

    postCar: build.mutation<CarResponse, CarRequest>({
      query: (car) => ({
        url: GARAGE_URL,
        method: 'POST',
        body: car,
      }),
      invalidatesTags: [{ type: API_TAGS.CAR }],
    }),

    updateCar: build.mutation<CarResponse, { id: CarID; data: CarRequest }>({
      query: ({ id, data }) => ({
        url: `${GARAGE_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: API_TAGS.CAR, id }],
    }),

    deleteCar: build.mutation<void, { id: CarID }>({
      query: ({ id }) => ({
        url: `${GARAGE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: API_TAGS.CAR, id }],
    }),
  }),
});
