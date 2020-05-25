const express = require('express');

const router = express.Router();

const { bookController } = require('../controllers');
const { validationMiddleware, property } = require('../validations');
const { createBookSchema } = require('../validations/books.validation');

router.get('/', bookController.getAllBooks);

router.get('/:id', bookController.getBookById);

router.post('/', validationMiddleware(createBookSchema, property.BODY), bookController.addBook);

router.put('/:id', bookController.updateBookByReplace);

router.patch('/:id', bookController.updateBookByUpdateFields);

router.delete('/:id', bookController.deleteBookById);

module.exports = router;
