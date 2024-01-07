const express = require('express');
const asyncHandler = require('express-async-handler');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Book = require('../models/Book');

const transactionsRoute = express.Router();



// Add transaction
transactionsRoute.post('/add', authMiddleware, adminMiddleware, asyncHandler(async(req, res)=>{
  const {userEmail, bookName, author, transactionType, dueDate} = req.body;

  const user = await User.find({ email:userEmail });
  const userId = user[0]._id;
  const book = await Book.find({name:bookName, author:author});
  const bookId = book[0]._id;


  try {
    const newTran = await Transaction.create({
      userId:userId,
      bookId:bookId,
      dueDate:dueDate,
      transactionType:transactionType,
    });
    res.status(200);
    res.json(newTran);
  } catch (error) {
    res.status(500);
    throw new Error('Book creating failed.');
  }

}));

// Update transaction
transactionsRoute.patch('/:trasactionId', authMiddleware, adminMiddleware,  asyncHandler(async (req, res) => {
  const { trasactionId } = req.params;
  const { availability } = req.body;

  let transactionType;

  await availability === 'returned' ? transactionType = 'borrowed' : transactionType = 'returned';
  const updatedTran = await Transaction.findByIdAndUpdate(
    trasactionId,
    { $set: { transactionType } },
    { new: true }
  );

  if (updatedTran) {
    res.status(200).json(updatedTran);
  } else {
    res.status(404);
    throw new Error('Transaction not found');
  }

}));

// Delete book
transactionsRoute.delete('/:trasactionId', authMiddleware, adminMiddleware,  asyncHandler(async (req, res) => {
  const { trasactionId } = req.params;
  
  const deletedTran = await Transaction.findByIdAndDelete(trasactionId);

  if (deletedTran) {
    res.status(200).json(deletedTran);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }

}));

// Get all transactions
transactionsRoute.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const allTransactions = await Transaction.find();
  res.status(200).json(allTransactions);
}));

// Get user transactions
transactionsRoute.get('/users/:userId/transactions', authMiddleware, asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const userTransactions = await Transaction.find({ userId: userId });
  res.status(200).json(userTransactions);
}));

// Get book transactions
transactionsRoute.get('/books/:bookId/transactions', authMiddleware, adminMiddleware, asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const bookTransactions = await Transaction.find({ bookId: bookId });
  res.status(200).json(bookTransactions);
}));

module.exports = transactionsRoute;