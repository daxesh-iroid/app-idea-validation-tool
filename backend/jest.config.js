module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: ['**/*.js', '!node_modules/**', '!coverage/**', '!tests/**'],
  coverageDirectory: 'coverage',
  verbose: true,
};
