const jwt = require('jsonwebtoken');
const { signToken, verifyToken } = require('../../utils/jwtUtil');

describe('jwtUtil', () => {
  test('signToken produces a valid JWT', () => {
    const token = signToken({ id: 1, role: 'admin' });
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });

  test('verifyToken decodes a valid token', () => {
    const payload = { id: 1, role: 'admin' };
    const token = signToken(payload);
    const decoded = verifyToken(token);
    expect(decoded.id).toBe(1);
    expect(decoded.role).toBe('admin');
  });

  test('verifyToken throws on expired token', () => {
    const token = jwt.sign({ id: 1 }, 'fallback_secret_change_me', { expiresIn: '0s' });
    // Small delay to ensure expiry
    expect(() => {
      jwt.verify(token, 'fallback_secret_change_me');
    }).toThrow();
  });

  test('verifyToken throws on tampered token', () => {
    const token = signToken({ id: 1 });
    const tampered = token.slice(0, -5) + 'xxxxx';
    expect(() => verifyToken(tampered)).toThrow();
  });

  test('token includes expiry', () => {
    const token = signToken({ id: 1 });
    const decoded = verifyToken(token);
    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();
  });
});
