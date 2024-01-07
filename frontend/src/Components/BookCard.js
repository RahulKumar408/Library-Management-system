// ImageCard.js
import React from 'react';
import '../css/BookCard.css'; 
import bookimg from '../images/book.jpg';

const BookCard = ({ name, author, availability}) => {
  return (
    <div className="image-card">
      <img src={bookimg} alt={name} className="book-image" />
      <div className="book-details">
        <p className="bookcard-title">{name}</p>
        <p className="bookcard-author">Author: {author}</p>
        
        <p className="bookcard-availability">Availability: <span>{availability ? 'Available' : 'Not Available'}</span> </p>
      </div>
    </div>
  );
};

export default BookCard;
