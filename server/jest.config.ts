import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
};

export default config;
