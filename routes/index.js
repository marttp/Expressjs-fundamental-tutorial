const express = require('express');

const bookRoute = require('./books.route');
const userRoute = require('./users.route');
const fileRoute = require('./files.route');

const router = express.Router();

router.use('/books', bookRoute);
router.use('/users', userRoute);
router.use('/files', fileRoute);

module.exports = router;
