const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email transporter ready');
  } catch (err) {
    console.error('❌ Email transporter error:', err.message);
  }
};

module.exports = { transporter, verifyTransporter };
