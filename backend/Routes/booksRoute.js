
const express = require('express');
const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const booksRoute = express.Router();

// Create book
booksRoute.post('/create', authMiddleware, adminMiddleware, asyncHandler(async(req, res)=>{
  const bookExits = await Book.find({name:req.body.name, author:req.body.author});

  if(bookExits.length > 0){
    res.status(409);
    throw new Error('Book already exits.')
  }else{
    try {
      const book = await Book.create(req.body);
      res.status(200);
      res.json(book);
    } catch (error) {
      res.status(500);
      throw new Error('Book creating failed.');
    }
  }
  
}));

// Update book
// Update book availability
booksRoute.patch('/:bookId', authMiddleware, adminMiddleware,  asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { availability } = req.body;

  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    { $set: { availability } },
    { new: true }
  );

  if (updatedBook) {
    res.status(200).json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }

}));

// Delete book
booksRoute.delete('/:bookId',authMiddleware, adminMiddleware, asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const deletedBook = await Book.findByIdAndDelete(bookId);

  if (deletedBook) {
    res.status(200).json(deletedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
}));


// fetched book 
booksRoute.get('/', asyncHandler(async(req, res)=>{
  
  const book = await Book.find({});

  if(book){
    res.status(200);
    res.json(book);
  }else{
    res.status(500);
    throw new Error('There are no books.');
  }

}));

module.exports = booksRoute;
