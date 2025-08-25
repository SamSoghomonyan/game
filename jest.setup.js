import '@testing-library/jest-dom';

jest.mock('./src/app/constants/env', () => ({
  BASE_URL: 'http://localhost:3000',
}));

global.fetch = jest.fn(
  () =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ mock: 'data' }),
    })
);