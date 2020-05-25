const winston = require('winston');
require('winston-daily-rotate-file');
const moment = require('moment');

const LOG_PATH = './logs';
const APP_NAME = 'bookstore';

const LOG_TYPE = {
  ROOT: 'root',
  DETAIL: 'detail',
};

const getWinstonRotateConfigByType = (type) => {
  return new winston.transports.DailyRotateFile({
    filename: `${LOG_PATH}/${type}/${APP_NAME}_%DATE%.log`,
    datePattern: 'YYYYMMDDHHmm',
    frequency: '15m',
    maxSize: '10m',
    timestamp: () => moment(),
  });
};

winston.loggers.add(LOG_TYPE.ROOT, {
  format: winston.format.printf(({ message }) => `${message}`),
  transports: [
    new winston.transports.Console(),
    getWinstonRotateConfigByType(LOG_TYPE.ROOT),
  ],
});

const modelLog = (data) => {
  const logResult = {
    timestamp: moment().format('YYYYMMDDHHmmss'),
  };
  if (typeof data === 'string') {
    logResult.message = data;
  } else if (typeof data === 'object') {
    logResult.data = data;
  }
  return JSON.stringify(logResult);
};

const logger = {
  info: (message) => {
    winston.loggers.get(LOG_TYPE.ROOT).info(modelLog(message));
  },
  error: (message) => {
    winston.loggers.get(LOG_TYPE.ROOT).error(modelLog(message));
  },
};


const morganJsonFormat = (tokens, req, res) => {
  return JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    'response-content-length': tokens.res(req, res, 'content-length'),
    'response-time': `${tokens['response-time'](req, res)} ms`,
  });
};

module.exports = {
  logger,
  morganJsonFormat,
};
