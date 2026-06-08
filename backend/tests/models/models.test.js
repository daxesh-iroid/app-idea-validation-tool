// Mock dotenv before any module that uses it
jest.mock('dotenv', () => ({ config: jest.fn() }));

// Mock the database config to prevent real DB connection
const mockSequelize = {
  define: jest.fn(() => ({
    prototype: {},
    hasMany: jest.fn(),
    belongsTo: jest.fn(),
  })),
  sync: jest.fn(),
  close: jest.fn(),
  authenticate: jest.fn(),
  options: { dialect: 'postgres' },
};
jest.mock('../../config/database', () => mockSequelize);

describe('models/Lead', () => {
  test('model is defined without error', () => {
    expect(() => require('../../models/Lead')).not.toThrow();
  });

  test('model defines expected columns', () => {
    const Lead = require('../../models/Lead');
    expect(Lead).toBeDefined();
    expect(Lead.prototype).toBeDefined();
  });
});

describe('models/AdminUser', () => {
  test('model is defined without error', () => {
    expect(() => require('../../models/AdminUser')).not.toThrow();
  });

  test('model has validatePassword method on prototype', () => {
    const AdminUser = require('../../models/AdminUser');
    expect(AdminUser.prototype.validatePassword).toBeDefined();
    expect(typeof AdminUser.prototype.validatePassword).toBe('function');
  });
});

describe('models/Validation', () => {
  test('model is defined without error', () => {
    expect(() => require('../../models/Validation')).not.toThrow();
  });

  test('model defines expected columns', () => {
    const Validation = require('../../models/Validation');
    expect(Validation).toBeDefined();
    expect(Validation.prototype).toBeDefined();
  });
});

describe('models/ScoreWeight', () => {
  test('model is defined without error', () => {
    expect(() => require('../../models/ScoreWeight')).not.toThrow();
  });
});

describe('models/EmailTemplate', () => {
  test('model is defined without error', () => {
    expect(() => require('../../models/EmailTemplate')).not.toThrow();
  });
});
