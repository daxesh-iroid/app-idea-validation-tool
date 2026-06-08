const bcrypt = require('bcryptjs');

describe('bcryptjs utility', () => {
  test('hash produces a string different from plaintext', async () => {
    const hash = await bcrypt.hash('test_password', 10);
    expect(hash).toBeDefined();
    expect(typeof hash).toBe('string');
    expect(hash).not.toBe('test_password');
  });

  test('compare returns true for correct password', async () => {
    const hash = await bcrypt.hash('test_password', 10);
    const result = await bcrypt.compare('test_password', hash);
    expect(result).toBe(true);
  });

  test('compare returns false for wrong password', async () => {
    const hash = await bcrypt.hash('test_password', 10);
    const result = await bcrypt.compare('wrong_password', hash);
    expect(result).toBe(false);
  });
});

describe('jsonwebtoken utility', () => {
  const jwt = require('jsonwebtoken');

  test('sign produces a token string', () => {
    const token = jwt.sign({ id: 1, role: 'admin' }, 'test-secret', { expiresIn: '1h' });
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });

  test('verify decodes a valid token', () => {
    const payload = { id: 1, role: 'admin' };
    const token = jwt.sign(payload, 'test-secret', { expiresIn: '1h' });
    const decoded = jwt.verify(token, 'test-secret');
    expect(decoded.id).toBe(1);
    expect(decoded.role).toBe('admin');
  });

  test('verify throws on invalid secret', () => {
    const token = jwt.sign({ id: 1 }, 'test-secret', { expiresIn: '1h' });
    expect(() => jwt.verify(token, 'wrong-secret')).toThrow();
  });
});
