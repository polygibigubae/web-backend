import 'dotenv/config'

import app from './app.js'
import sequelize from './config/db.js'
import { config } from './config/env.js'
import User from './models/User.js'

const listenWithRetry = (appInstance, startingPort, { maxAttempts = 10 } = {}) =>
  new Promise((resolve, reject) => {
    let attempt = 0
    let port = startingPort

    const tryListen = () => {
      attempt += 1

      const server = appInstance.listen(port, () => resolve(server))

      server.on('error', (err) => {
        if (err?.code === 'EADDRINUSE' && attempt < maxAttempts) {
          server.close(() => {
            port += 1
            tryListen()
          })
          return
        }

        reject(err)
      })
    }

    tryListen()
  })

// Test database connection and sync models
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    // Sync models with database
    await sequelize.sync();
    console.log("✅ Database models synchronized.");

    // Start server
    const startingPort = Number(config.port)
    const server = await listenWithRetry(app, startingPort, { maxAttempts: 20 })

    const address = server.address()
    const actualPort =
      typeof address === 'object' && address ? address.port : startingPort

    if (actualPort !== startingPort) {
      console.warn(`⚠️ Port ${startingPort} was busy, using ${actualPort} instead`)
    }

    console.log(`🚀 Server is running on port ${actualPort}`)
    console.log(`📝 Environment: ${config.nodeEnv}`)
    console.log(`🌐 Health check: http://localhost:${actualPort}/health`)
  } catch (error) {
    console.error("❌ Unable to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

startServer();
