module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: ['<rootDir>/packages/*/jest.config.js', '<rootDir>/apps/*/jest.config.js'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
    '<rootDir>/packages/*/src/**/*.ts',
    '<rootDir>/apps/*/src/**/*.ts',
    '!<rootDir>/**/*.test.ts',
    '!<rootDir>/**/*.spec.ts',
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/**/node_modules/**',
  ],
};
