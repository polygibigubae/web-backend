import app from './app.js';
import sequelize from './config/db.js';
import { config } from './config/env.js';
import User from './models/User.js';

// Test database connection and sync models
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Sync models with database
    await sequelize.sync({ alter: false }); 
    console.log('✅ Database models synchronized.');

    // Start server
    const PORT = config.port;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

startServer();
