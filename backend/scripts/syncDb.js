const { sequelize } = require('../models');

const syncDb = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');
    process.exit(0);
  } catch (err) {
    console.error('Database sync failed:', err.message);
    process.exit(1);
  }
};

syncDb();
