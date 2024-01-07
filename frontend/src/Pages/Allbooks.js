import React, { useEffect, useState } from "react";
import '../css/Allbooks.css'
import BookCard from "../Components/BookCard";
import axios from "axios";

function Allbooks() {
  // Fetched all books
  const API_URL = process.env.REACT_APP_API_URL;

  const [allBooks, setAllBooks] = useState([])

  useEffect(() => {
    const getallBooks = async () => {
      const response = await axios.get(API_URL + "api/books")
      setAllBooks(response.data)
    }
    getallBooks()
  }, [API_URL]);
  
  return (
    <div className="books-page">
      <div className="books">
        {allBooks.map((book, index) => (
          <BookCard key={index} {...book} />
        ))}
      </div>
    </div>
  );
}

export default Allbooks;
