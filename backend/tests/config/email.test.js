// Mock dotenv before any module that uses it
jest.mock('dotenv', () => ({ config: jest.fn() }));

// Mock nodemailer to prevent real SMTP connection
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    verify: jest.fn().mockResolvedValue(true),
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-123' }),
  })),
}));

describe('config/email', () => {
  test('exports transporter and verifyTransporter', () => {
    const { transporter, verifyTransporter } = require('../../config/email');
    expect(transporter).toBeDefined();
    expect(typeof transporter.verify).toBe('function');
    expect(typeof transporter.sendMail).toBe('function');
    expect(typeof verifyTransporter).toBe('function');
  });

  test('verifyTransporter resolves without error', async () => {
    const { verifyTransporter } = require('../../config/email');
    await expect(verifyTransporter()).resolves.not.toThrow();
  });
});
