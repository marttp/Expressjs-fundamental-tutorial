// Import library
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const fsr = require('file-stream-rotator');

// Import user-defined files / modules
require('./configs/dbconfig');
const appRoute = require('./routes');
const { morganJsonFormat } = require('./utils/log.util');

// User-defined variable
const app = express();

// Setup middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Request log setup
morgan.token('type', (req, res) => req.headers['content-type']);
app.use(morgan(morganJsonFormat));

const morganLogStream = fsr.getStream({
  filename: `./logs/request_logs/bookstore_%DATE%.log`,
  frequency: '15m',
  size: '10m',
  verbose: false,
  date_format: 'YYYYMMDDHHmm',
});
app.use(morgan(morganJsonFormat, { stream: morganLogStream }));

// Setup routing
app.use('/api', appRoute);

app.use((req, res) => {
  res.status(404).json({
    message: 'Path not found',
  });
});

// Export app
module.exports = app;
