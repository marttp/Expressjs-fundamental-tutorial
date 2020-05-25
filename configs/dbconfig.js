const mongoose = require('mongoose');

const { logger } = require('../utils/log.util');

const DB_USER = 'root';
const DB_PASSWORD = '123456789';
const DB_HOST = 'localhost:27017';
const DB_NAME = 'bookstore';

const mongoDbUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?authSource=admin`;

const db = mongoose.connection;

mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

db.on('connected', () => {
  logger.info('Connected to MongoDB');
});

db.on('error', () => {
  logger.info('MongoDB connection error');
});
