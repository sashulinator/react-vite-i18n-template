module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src', 'node_modules'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
}
