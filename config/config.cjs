require('dotenv').config(); // Must be at the top to load .env

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS || null, // Fallback to null if undefined
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
    dialectOptions: {
      ssl: false // Add to all environments if needed
    },
    logging: console.log // Useful for debugging
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME_TEST, // Recommended to use separate DB for tests
    host: "127.0.0.1",
    dialect: "postgres",
    dialectOptions: {
      ssl: false
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1", // Flexible host for production
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};