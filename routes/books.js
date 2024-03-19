const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/books');

router.route('/').post(createBook).get(getAllBooks);
router.route('/:id').get(getSingleBook).delete(deleteBook).patch(updateBook);

module.exports = router;
