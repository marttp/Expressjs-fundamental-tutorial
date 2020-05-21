let mockBooks = [
  {
    id: '1',
    name: 'Book 1',
    price: 10,
  },
  {
    id: '2',
    name: 'Book 2',
    price: 12,
  },
  {
    id: '3',
    name: 'Book 3',
    price: 5,
  },
];

const getAllBooks = async (req, res) => {
  res.status(200).send(mockBooks);
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const existBook = mockBooks.find((book) => book.id === id);
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
    const lastBook = mockBooks.length ? mockBooks[mockBooks.length - 1] : {};
    const newBook = {
      id: `${parseInt(lastBook.id, 10) + 1}` || '1',
      name,
      price,
    };
    mockBooks.push(newBook);
    res.status(201).send(newBook);
  } catch (error) {
    res.status(500).send({
      message: 'Something went wrong',
    });
  }
};

const updateBookByReplace = async (req, res) => {
  try {
    const bookId = req.params.id;
    const indexOfBook = mockBooks.findIndex((book) => book.id === bookId);
    if (indexOfBook < 0) {
      return res.status(404).send({
        message: `Book with id: ${bookId} not found`,
      });
    }
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).send({
        message: 'Missing criteria for Book',
      });
    }
    mockBooks[indexOfBook] = { id: mockBooks[indexOfBook].id, name, price };
    res.status(200).send({
      message: 'Update success',
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const updateBookByUpdateFields = async (req, res) => {
  try {
    const bookId = req.params.id;
    const indexOfBook = mockBooks.findIndex((book) => book.id === bookId);
    if (indexOfBook < 0) {
      return res.status(404).send({
        message: `Book with id: ${bookId} not found`,
      });
    }
    const { name, price } = req.body;
    mockBooks[indexOfBook].name = name || mockBooks[indexOfBook].name;
    mockBooks[indexOfBook].price = price || mockBooks[indexOfBook].price;
    res.status(200).send({
      message: 'Update success',
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const existBook = mockBooks.find((book) => book.id === bookId);
    if (!existBook) {
      return res.status(404).send({
        message: `Book id: ${bookId} not found`,
      });
    }
    mockBooks = mockBooks.filter((book) => book.id !== bookId);
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
