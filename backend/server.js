const app = require('./app');
const { verifyTransporter } = require('./config/email');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await verifyTransporter();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
