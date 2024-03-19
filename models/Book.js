const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Please provide name'],
      maxlength: 100,
    },
    pages: {
      
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Read', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', BookSchema);
