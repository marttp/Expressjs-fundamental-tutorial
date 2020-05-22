const { ObjectId } = require('mongoose').Types;

const bookModel = require('../models/book.model');

const getAllBooks = async (req, res) => {
  const books = await bookModel.find({});
  res.status(200).send(books);
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        message: 'Id is invalid',
      });
    }
    const existBook = await bookModel.findById(id);
    if (!existBook) {
      return res.status(404).send({
        message: 'Book not found',
      });
    }
    res.status(200).send(existBook);
  } catch (error) {
    res.status(500).send({
      message: 'Something went wrong',
    });
  }
};

const addBook = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name && !price) {
      return res.status(400).send({
        message: 'Bad request: some fields is missing',
      });
    }
    const newBook = {
      name,
      price,
    };
    const book = await bookModel.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    res.status(500).send({
      message: 'Something went wrong',
    });
  }
};

const updateBookByReplace = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).send({
        message: 'Id is invalid',
      });
    }
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).send({
        message: 'Missing criteria for Book',
      });
    }
    const updatedBook = await bookModel.findOneAndUpdate(
      { _id: bookId },
      { name, price },
      { new: true },
    );
    res.status(200).send(updatedBook);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const updateBookByUpdateFields = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).send({
        message: 'Id is invalid',
      });
    }
    const { name, price } = req.body;

    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (price) {
      updateData.price = price;
    }

    const updatedBook = await bookModel.findOneAndUpdate(
      { _id: bookId },
      updateData,
      { new: true },
    );
    res.status(200).send(updatedBook);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).send({
        message: 'Id is invalid',
      });
    }
    const existBook = await bookModel.findById(bookId);
    if (!existBook) {
      return res.status(404).send({
        message: `Book id: ${bookId} not found`,
      });
    }
    await bookModel.deleteOne({ _id: bookId });
    res.status(200).send({
      message: `Book id: ${bookId} is deleted`,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBookByReplace,
  updateBookByUpdateFields,
  deleteBookById,
};
