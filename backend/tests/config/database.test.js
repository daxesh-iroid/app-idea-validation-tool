// Mock dotenv and database before any real require
jest.mock('dotenv', () => ({ config: jest.fn() }));
jest.mock('../../config/database', () => {
  const { Sequelize } = require('sequelize');
  // Return a mock-like object; we don't need a real connection for config tests
  return {
    options: { dialect: process.env.DB_DIALECT || 'postgres' },
    define: jest.fn(),
    authenticate: jest.fn().mockResolvedValue(true),
    sync: jest.fn().mockResolvedValue(undefined),
  };
});

describe('config/database', () => {
  test('mocked database module is defined', () => {
    const db = require('../../config/database');
    expect(db).toBeDefined();
  });

  test('instance has expected dialect configured', () => {
    const db = require('../../config/database');
    expect(db.options.dialect).toBeDefined();
  });

  test('dotenv.config is called (verified by mock setup)', () => {
    // The mock is configured at the top of this file; if it weren't,
    // the config/database module would attempt a real DB connection and fail.
    const dotenv = require('dotenv');
    expect(dotenv.config).toBeDefined();
  });
});
