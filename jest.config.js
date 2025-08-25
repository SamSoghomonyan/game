/** @type {import('jest').Config} */

const config = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    // exeptions
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/**/redux/**',
    '!src/**/constants/**',
    '!src/**/providers/**',
    '!src/**/model/**',
    '!src/**/index.ts',
    '!src/**/types.ts',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    // '^.+\\.svg\\?react$': 'jest-svg-transformer',
    // '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.svg\\?react$': '<rootDir>/src/app/test-utils/__mocks__/svg.js',
    '^.+\\.svg$': '<rootDir>/src/app/test-utils/__mocks__/svg.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
};

export default config;
