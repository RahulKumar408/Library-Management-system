const mongoose = require('mongoose');

const libraryTransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ['borrowed', 'returned'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LibraryTransaction = mongoose.model('LibraryTransaction', libraryTransactionSchema);

module.exports = LibraryTransaction;
