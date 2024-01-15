import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { AuthContext } from '../../../../Context/AuthContext';
import Swal from 'sweetalert2'

function GetBooks() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const jwtToken = user.token;

    const [allBooks, setAllBooks] = useState([]);

    const handleDelete = async (bookId) => {
        try {
            setIsLoading(true);
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
    
            if (result.isConfirmed) {
                const deleteRes = await axios.delete(`${API_URL}api/books/${bookId}`, {
                    headers: { Authorization: jwtToken },
                });
                // Refresh the book list after deletion
                const response = await axios.get(API_URL + "api/books");
                setAllBooks(response.data);
                if(deleteRes.status === 200){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Book has been deleted.",
                        icon: "success"
                    });
                }
                
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            Swal.fire({
                title: "Error!",
                text: error,
                icon: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };
    

    const handleUpdateAvailability = async (bookId, newAvailability) => {
        try {
            setIsLoading(true);
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You want to change book avaibality.",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            });
    
            if (result.isConfirmed) {
                await axios.patch(`${API_URL}api/books/${bookId}`, { availability: newAvailability }, {
                    headers: { Authorization: jwtToken },
                });
                // Refresh the book list after updating availability
                const response = await axios.get(API_URL + "api/books");
                setAllBooks(response.data);
                Swal.fire({
                    title: "Updated!",
                    text: "Book avaibality has been altered.",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            Swal.fire({
                title: "Updated!",
                text: error,
                icon: "success"
            });
        } finally {
            setIsLoading(false);
        }
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
