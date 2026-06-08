jest.mock('dotenv', () => ({ config: jest.fn() }));
jest.mock('../../config/database', () => ({
  options: { dialect: 'postgres' },
  define: jest.fn(),
  authenticate: jest.fn().mockResolvedValue(true),
  sync: jest.fn().mockResolvedValue(undefined),
}));

const { apiResponse } = require('../../utils/apiResponse');

describe('apiResponse', () => {
  test('returns success response with message', () => {
    const result = apiResponse(true, 'OK');
    expect(result).toEqual({ success: true, message: 'OK' });
  });

  test('includes data when provided', () => {
    const result = apiResponse(true, 'OK', { id: 1 });
    expect(result.data).toEqual({ id: 1 });
  });

  test('includes meta when provided', () => {
    const result = apiResponse(true, 'OK', null, { total: 10 });
    expect(result.meta).toEqual({ total: 10 });
  });

  test('excludes data when null', () => {
    const result = apiResponse(true, 'OK');
    expect(result.data).toBeUndefined();
  });

  test('excludes meta when null', () => {
    const result = apiResponse(true, 'OK');
    expect(result.meta).toBeUndefined();
  });

  test('handles error response', () => {
    const result = apiResponse(false, 'Not found');
    expect(result).toEqual({ success: false, message: 'Not found' });
  });
});
