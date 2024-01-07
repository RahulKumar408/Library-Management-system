const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Book name is required'],
    },
    author: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.pre('save', function (next) {
  // 'this' refers to the document being saved
  this.name = this.name.toLowerCase();
  this.author = this.author.toLowerCase();
  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
