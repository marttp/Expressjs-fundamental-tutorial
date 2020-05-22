const path = require('path');

const envFile = process.env.NODE_ENV === 'production' ? path.resolve(process.cwd(), '.env.production') : path.resolve(process.cwd(), '.env');
require('dotenv').config({ path: envFile });

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT, 10),
};
