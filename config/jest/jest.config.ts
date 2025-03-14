import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  testEnvironment: 'jest-environment-jsdom',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleDirectories: ['node_modules'],
  modulePaths: ['<rootDir>src'],
  testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
  rootDir: '../../',
  moduleNameMapper: {
    '^entities/(.*)$': '<rootDir>/src/entities/$1',
  },
};

export default config;
