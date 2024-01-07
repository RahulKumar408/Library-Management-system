import React, {useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { AuthContext } from '../../../../Context/AuthContext';

function GetBooks() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const jwtToken = user.token;

    const [allBooks, setAllBooks] = useState([]);

    const handleDelete = async (bookId) => {
        setIsLoading(true);

        try {
            await axios.delete(`${API_URL}api/books/${bookId}`, {
                headers: { Authorization: jwtToken },
            });
            // Refresh the book list after deletion
            const response = await axios.get(API_URL + "api/books");
            setAllBooks(response.data);
            alert("Book Deleted")
        } catch (error) {
            console.error('Error deleting book:', error);
        }
        setIsLoading(false);
    };

    const handleUpdateAvailability = async (bookId, newAvailability) => {
        setIsLoading(true);
        try {
            await axios.patch(`${API_URL}api/books/${bookId}`, { availability: newAvailability }, {
                headers: { Authorization: jwtToken },
            });
            // Refresh the book list after updating availability
            const response = await axios.get(API_URL + "api/books");
            setAllBooks(response.data);
            alert("Book availability updated");
        } catch (error) {
            console.error('Error updating availability:', error);
        }
        setIsLoading(false);
    };

    // Fetched all books
    useEffect(() => {
        const getallBooks = async () => {
            try {
                const response = await axios.get(API_URL + "api/books");
                setAllBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        getallBooks();
    }, [API_URL]);

    return (
        <div>
            <div>
                <p className="dashboard-option-title">All Books</p>
                <div className="dashboard-title-line"></div>
                {allBooks.length > 0 ? (
                    <table className='admindashboard-table'>
                        <thead>
                            <tr>
                                <th>Book Name</th>
                                <th>Author</th>
                                <th>Added Date</th>
                                <th>Availability</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allBooks.map((book, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{book.name}</td>
                                        <td>{book.author}</td>
                                        <td>{moment(book.createdAt).format('YYYY-MM-DD')}</td>
                                        <td>
                                            <p>
                                                {book.availability ? 'Yes' : 'No'}
                                                <EditIcon
                                                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                                                    onClick={() => handleUpdateAvailability(book._id, !book.availability)}
                                                />
                                            </p>
                                        </td>
                                        <td>
                                            <DeleteIcon style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => handleDelete(book._id)} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className='nobook'>No Book Available</div>
                )}
            </div>
        </div>
    );
}

export default GetBooks;
