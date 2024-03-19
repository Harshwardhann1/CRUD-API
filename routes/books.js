const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  getSingleBook,
  createBook,
  deleteBook,
  updateBook,
} = require('../controllers/books');

router.route('/').post(createBook).get(getAllBooks);
router.route('/:id').get(getSingleBook).delete(deleteBook).patch(updateBook);


module.exports = router;