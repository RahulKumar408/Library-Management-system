import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import '../../MemberDashboard/MemberDashboard.css'
import { AuthContext } from '../../../../Context/AuthContext'
import EditIcon from '@material-ui/icons/Edit'
import Swal from 'sweetalert2';

function AllTransaction() {

    const API_URL = process.env.REACT_APP_API_URL
    const { user } = useContext(AuthContext)
    const jwtToken = user.token;
    const [isLoading, setIsLoading] = useState(false);

    const [allTransactions, setAllTransactions] = useState([]);

    // handle edit
    const handleEdit = async (trasactionId, transType) => {

        try {
            setIsLoading(true);
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You want to change alter transaction type.",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            });
    
            if (result.isConfirmed) {
                await axios.patch(`${API_URL}api/library-transactions/${trasactionId}`, { availability: transType}, {
                    headers: { Authorization: jwtToken },
                });
                // Refresh the book list after updating availability
                const response = await axios.get(API_URL + "api/library-transactions", {
                    headers: { Authorization: jwtToken },
                });
                setAllTransactions(response.data)
                Swal.fire({
                    title: "Updated!",
                    text: "Book avaibality has been altered.",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error('Error updating transaction type:', error);
            Swal.fire({
                title: "Updated!",
                text: error,
                icon: "success"
            });
        } finally {
            setIsLoading(false);
        }
    };


    /* Getting all active transactions */
    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                const response = await axios.get(API_URL + "api/library-transactions", {
                    headers: { Authorization: jwtToken },
                })
                setAllTransactions(response.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getAllTransactions();
    }, [API_URL, jwtToken]);

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
