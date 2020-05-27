const express = require('express');

const { fileController } = require('../controllers');
const { validationMiddleware, property } = require('../validations');
const { getFileSchema } = require('../validations/files.validation');

const router = express.Router();

router.get('/', validationMiddleware(getFileSchema, property.QUERY), fileController.getFile);
router.post('/', fileController.uploadFile);

module.exports = router;
