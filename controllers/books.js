const Book = require('../models/Book');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllBooks = async (req, res) => {
  const books = await Book.find({ createdBy: req.user.userId }).sort(
    'createdAt'
  );
  res.status(StatusCodes.OK).json({ books, count: books.length });
};
const getSingleBook = async (req, res) => {
  const {
    user: { userId },
    params: { id: bookId },
  } = req;

  const book = await Book.findOne({
    _id: bookId,
    createdBy: userId,
  });
  if (!book) {
    throw new NotFoundError(`No book with id ${bookId}`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const createBook = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const book = await Book.create(req.body);
  res.status(StatusCodes.CREATED).json({ book });
};

// const updateBook = async (req, res) => {
//   const {
//     body: { pages },
//     user: { userId },
//     params: { id: bookId },
//   } = req;

//   if (pages === '') {
//     throw new BadRequestError('Page field cannot be empty');
//   }
//   const book = await Book.findByIdAndUpdate(
//     { _id: bookId, createdBy: userId },
//     req.body,
//     { new: true, runValidators: true }
//   );
//   if (!book) {
//     throw new NotFoundError(`No book with id ${bookId}`);
//   }
//   res.status(StatusCodes.OK).json({ book });
// };

const updateBook = async (req, res) => {
  try {
    const {
      body: { pages },
      user: { userId },
      params: { id: bookId },
    } = req;

    console.log('Pages:', pages);
    console.log('UserID:', userId);
    console.log('BookID:', bookId);
    console.log('Request Body:', req.body);

    if (pages === '') {
      throw new BadRequestError('Page field cannot be empty');
    }

    const book = await Book.findByIdAndUpdate(bookId, { pages }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      throw new NotFoundError(`No book with id ${bookId}`);
    }

    res.status(StatusCodes.OK).json({ book });
  } catch (error) {
    console.error('Error updating book:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const deleteBook = async (req, res) => {
  const {
    user: { userId },
    params: { id: bookId },
  } = req;

  const book = await Book.findOneAndDelete({
    _id: bookId,
    createdBy: userId,
  });
  if (!book) {
    throw new NotFoundError(`No book with id ${bookId}`);
  }
  res.status(StatusCodes.OK).json({ msg: 'Success! Book removed.' });
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
