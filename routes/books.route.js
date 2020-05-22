const express = require('express');

const router = express.Router();

const { bookController } = require('../controllers');

router.get('/', bookController.getAllBooks);

router.get('/:id', bookController.getBookById);

router.post('/', bookController.addBook);

router.put('/:id', bookController.updateBookByReplace);

router.patch('/:id', bookController.updateBookByUpdateFields);

router.delete('/:id', bookController.deleteBookById);

module.exports = router;
