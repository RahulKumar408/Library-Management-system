import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { AuthContext } from '../../../../Context/AuthContext'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"

function AddTransaction() {

    const API_URL = process.env.REACT_APP_API_URL;
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const jwtToken = user.token;

    const [userEmail, setUserEmail] = useState(""); 
    const [bookName, setBookName] = useState(""); 
    const [author, setAuthor] = useState(""); 
    const [recentTransactions, setRecentTransactions] = useState([])
    const [dueDate, setDueDate] = useState(null)
    const [dueDateString, setDueDateString] = useState(null)

    const transactionTypes = [
        { value: 'borrowed', text: 'Borrowed' },
        { value: 'returned', text: 'Returned' }
    ]

    const [transactionType, setTransactionType] = useState("")

    /* Adding a Transaction */
    const addTransaction = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const transactionData = {
            userEmail: userEmail,
            bookName: bookName,
            author: author,
            dueDate: dueDate,
            transactionType:transactionType,
        };
        
        try {
            const response = await axios.post(API_URL + "api/library-transactions/add", transactionData, {
                headers: { Authorization: jwtToken },
            });

            if (recentTransactions.length >= 5) {
                recentTransactions.splice(-1);
            }

            setRecentTransactions([response.data, ...recentTransactions]);
            setUserEmail("");
            setBookName("");
            setAuthor("");
            setDueDate("");
            alert("Transaction Added Successfully 🎉");
        } catch (err) {
            console.error(err);
        }
        setIsLoading(false);
    }


    /* Fetch Transactions */
    useEffect(() => {
        const getTransactions = async () => {
            try {
                const response = await axios.get(API_URL + "api/library-transactions", {
                    headers: { Authorization: jwtToken },
                });
                setRecentTransactions(response.data.slice(-5))
            }
            catch (err) {
                console.log("Error in fetching transactions")
            }

        }
        getTransactions()
    }, [API_URL]);


    return (
        <div>
            <p className="dashboard-option-title">Add a Transaction</p>
            <div className="dashboard-title-line"></div>
            <form className='transaction-form' onSubmit={addTransaction}>
                <label className="transaction-form-label" htmlFor="userEmail">User Email<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="email" name="userEmail" value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} required></input><br />
                
                <label className="transaction-form-label" htmlFor="bookName">Book Name<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="bookName" value={bookName} onChange={(e) => { setBookName(e.target.value) }} required></input><br />
                
                <label className="transaction-form-label" htmlFor="author">Author Name<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="author" value={author} onChange={(e) => { setAuthor(e.target.value) }} required></input><br />

                <label className="transaction-form-label" htmlFor="transactionType">Transaction Type<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Select Transaction'
                        fluid
                        selection
                        value={transactionType}
                        options={transactionTypes}
                        onChange={(event, data) => setTransactionType(data.value)}
                    />
                </div>
                <br />

                <label className="transaction-form-label" htmlFor="to-date">Due Date<span className="required-field">*</span></label><br />
                <DatePicker
                    className="date-picker"
                    placeholderText="MM/DD/YYYY"
                    selected={dueDate}
                    onChange={(date) => { setDueDate(date); setDueDateString(moment(date).format("MM/DD/YYYY")) }}
                    minDate={new Date()}
                    dateFormat="MM/dd/yyyy"
                />

                <input className="transaction-form-submit" type="submit" value="SUBMIT" disabled={isLoading}></input>
            </form>
            <p className="dashboard-option-title">Recent Transactions</p>
            <div className="dashboard-title-line"></div>
            <table className="admindashboard-table">
                <tr>
                    <th>S.No</th>
                    <th>Book Id</th>
                    <th>User Id</th>
                    <th>Date</th>
                </tr>
                {
                    recentTransactions.map((transaction, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{transaction.bookId}</td>
                                <td>{transaction.userId}</td>
                                <td>{transaction.updatedAt.slice(0, 10)}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default AddTransaction