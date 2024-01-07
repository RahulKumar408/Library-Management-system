import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { Dropdown } from 'semantic-ui-react'
import '../../MemberDashboard/MemberDashboard.css'
import { AuthContext } from '../../../../Context/AuthContext'
import EditIcon from '@material-ui/icons/Edit'


function AllTransaction() {

    const API_URL = process.env.REACT_APP_API_URL
    const { user } = useContext(AuthContext)
    const jwtToken = user.token;
    const [isLoading, setIsLoading] = useState(false);

    const [allTransactions, setAllTransactions] = useState([]);
    const [ExecutionStatus, setExecutionStatus] = useState(null) /* For triggering the tabledata to be updated */

    const [allMembersOptions, setAllMembersOptions] = useState(null)
    const [borrowerId, setBorrowerId] = useState(null)

    // handle edit
    const handleEdit = async (trasactionId, transType) => {
        setIsLoading(true);
        try {
            await axios.patch(`${API_URL}api/library-transactions/${trasactionId}`, { availability: transType}, {
                headers: { Authorization: jwtToken },
            });
            // Refresh the book list after updating availability
            const response = await axios.get(API_URL + "api/library-transactions", {
                headers: { Authorization: jwtToken },
            });
            setAllTransactions(response.data)
            alert("Transactions type updated");
        } catch (error) {
            console.error('Error updating transaction type:', error);
        }
        setIsLoading(false);
    };


    /* Getting all active transactions */
    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                const response = await axios.get(API_URL + "api/library-transactions", {
                    headers: { Authorization: jwtToken },
                })
                setAllTransactions(response.data)
                console.log("Okay")
            }
            catch (err) {
                console.log(err)
            }
        }
        getAllTransactions()
    }, [API_URL])

    return (
        <div>
            <div className='semanticdropdown returnbook-dropdown'>
                All Transaction
            </div>
            <p className="dashboard-option-title">Issued</p>
            <table className="admindashboard-table">
                <tr>
                    <th>User Id</th>
                    <th>Book Id</th>
                    <th>Due Date</th>
                    <th>djs</th>
                </tr>
                {
                    allTransactions.filter((data) => {
                        return data.transactionType === "borrowed"
                    }).map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{data.userId}</td>
                                <td>{data.bookId}</td>
                                <td>{data.dueDate}</td>
                                <td><p>
                                    {data.transactionType}
                                    <EditIcon
                                        style={{ marginLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => handleEdit(data._id, data.availability)}
                                    />
                                </p></td>
                            </tr>
                        )
                    })
                }
            </table>
            <p className="dashboard-option-title">Returned</p>
            <table className="admindashboard-table">
                <tr>
                    <th>User Id</th>
                    <th>Book Id</th>
                    <th>Due Date</th>
                    <th>djs</th>
                </tr>
                {
                    allTransactions.filter((data) => {
                        return data.transactionType === "returned"
                    }).map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{data.userId}</td>
                                <td>{data.bookId}</td>
                                <td>{data.dueDate}</td>
                                <td><p>
                                    {data.transactionType}
                                    <EditIcon
                                        style={{ marginLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => handleEdit(data._id, data.availability)}
                                    />
                                </p></td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default AllTransaction
