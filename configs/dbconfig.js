const mongoose = require('mongoose');

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
  console.log('Connected to MongoDB');
});

db.on('error', () => {
  console.log('MongoDB connection error');
});
