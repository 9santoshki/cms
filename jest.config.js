module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Only *.test.(ts|tsx|js) / *.spec.(ts|tsx|js) are test files. A previous,
  // broader "**/tests/**/*.+(ts|tsx|js)" pattern here matched every file
  // under tests/ — including non-test fixtures like tests/mockData.ts —
  // and Jest fails any matched file with no test() in it.
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};