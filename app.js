// Import library
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

// Import user-defined files / modules
require('./configs/dbconfig');
const appRoute = require('./routes');

// User-defined variable
const app = express();

// Setup middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Setup routing
app.use('/api', appRoute);

app.use((req, res) => {
  res.status(404).json({
    message: 'Path not found',
  });
});

// Export app
module.exports = app;
