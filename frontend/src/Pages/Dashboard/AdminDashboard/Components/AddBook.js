import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { AuthContext } from '../../../../Context/AuthContext'
import { Dropdown } from 'semantic-ui-react'

function AddBook() {

    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext)
    const jwtToken = user.token;

    const [bookName, setBookName] = useState("")
    const [author, setAuthor] = useState("")
    const [selectedAvailability, setSelectedAvailability] = useState([])
    const [recentAddedBooks, setRecentAddedBooks] = useState([])

    const allCategories = [
        { key: 'yes', value: 'true', text: 'Yes' },
        { key: 'no', value: 'false', text: 'No' },
    ];

    /* Adding book function */
    const addBook = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const BookData = {
            name: bookName,
            author: author,
            availability: selectedAvailability
        };

        try {
            const response = await axios.post(API_URL + "api/books/create", BookData, {
                headers: { Authorization: jwtToken },
            });

            if (recentAddedBooks.length >= 5) {
                recentAddedBooks.splice(-1);
            }

            setRecentAddedBooks([response.data, ...recentAddedBooks]);
            setBookName("");
            setAuthor("");
            setSelectedAvailability([]);
            alert("Book Added Successfully 🎉");
        } catch (err) {
            console.error(err);
        }
        setIsLoading(false);
    };



    useEffect(() => {
        const getallBooks = async () => {
            const response = await axios.get(API_URL + "api/books")
            setRecentAddedBooks(response.data.slice(-5));
        }
        getallBooks()
    }, [API_URL])


    return (
        <div>
            <p className="dashboard-option-title">Add a Book</p>
            <div className="dashboard-title-line"></div>
            <form className='addbook-form' onSubmit={addBook}>

                <label className="addbook-form-label" htmlFor="bookName">Book Name<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="bookName" value={bookName} onChange={(e) => { setBookName(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="author">Author Name<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="author" value={author} onChange={(e) => { setAuthor(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="availability">Availability<span className="required-field">*</span></label><br />
                <div className="semanticdropdown">
                    <Dropdown
                        placeholder='Select'
                        fluid
                        search
                        selection
                        options={allCategories}
                        value={selectedAvailability}
                        onChange={(event, value) => setSelectedAvailability(value.value)}
                    />
                </div>
                <input className="addbook-submit" type="submit" value="SUBMIT" disabled={isLoading}></input>
            </form>
            <div>
                <p className="dashboard-option-title">Recently Added Books</p>
                <div className="dashboard-title-line"></div>
                {recentAddedBooks.length > 0 ? <table className='admindashboard-table'>
                    <tr>
                        <th>S.No</th>
                        <th>Book Name</th>
                        <th>Added Date</th>
                    </tr>
                    {
                        recentAddedBooks.map((book, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{book.name}</td>
                                    <td>{book.createdAt.substring(0, 10)}</td>
                                </tr>
                            )
                        })
                    }
                </table> : <div className='nobook'>No Book Available</div>}

            </div>
        </div>
    )
}

export default AddBook