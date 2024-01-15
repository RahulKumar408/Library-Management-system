import React, { useContext, useEffect, useState } from 'react';
import "../AdminDashboard.css";
import axios from "axios";
import { Dropdown } from 'semantic-ui-react';
import { AuthContext } from '../../../../Context/AuthContext';
import "react-datepicker/dist/react-datepicker.css";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddUser() {

    const API_URL = process.env.REACT_APP_API_URL;
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const jwtToken = user.token;

    const [userType, setUserType] = useState('');
    const [userName, setUserName] = useState(null);
    const [userFullName, setUserFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [mobileNumber, setMobileNumber] = useState(null);
    const [allAdmins, setAllAdmins] = useState(null);
    const [allUsers, setAllUsers] = useState(null);
    const [show, setShow] = useState(false);
    // for form edit
    const [updateUsername, setUpdateUsername] = useState(null);
    const [updateName, setUpdateName] = useState(null);
    const [updateEmail, setUpdateEmail] = useState(null);

    const userTypes = [
        { value: 'user', text: 'User' },
        { value: 'admin', text: 'Admin' }
    ]

    // handle model

    const handleClose = () =>{
        setUpdateUsername(null);
        setUpdateName(null);
        setUpdateEmail(null);
        setShow(false);
        
    } 
    const handleShow = () => setShow(true);

    const showAlert = (title, text, icon) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon
        });
    }
    //Add a User
    const AddingUser = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (userFullName !== null && userType !== '' && mobileNumber !== null && email !== null) {
            const userData = {
                username: userName,
                name: userFullName,
                email: email,
                contactNumber: mobileNumber,
                password: password
            }
            try {

                let response;
                if (userType === 'admin') {
                    response = await axios.post(API_URL + "api/admins/register", userData, {
                        headers: { Authorization: jwtToken },
                    });
                    response.status === 200 ? showAlert("Added", "Admin added succesfully.", "success") : showAlert("Error", "Something went wrong. Try after sometimes!", "error");
                    const res = await axios.get(API_URL + "api/admins");
                    setAllAdmins(res.data);
                } else {
                    response = await axios.post(API_URL + "api/users/add", userData, {
                        headers: { Authorization: jwtToken },
                    });
                    response.status === 200 ? showAlert("Added", "User added succesfully.", "success") : showAlert("Error", "Something went wrong. Try after sometimes!", "error");
                    const res = await axios.get(API_URL + "api/users");
                    setAllUsers(res.data);
                }

            }
            catch (error) {
                showAlert("Error!", error, "error");
            } finally {
                setUserFullName(null)
                setUserType(null)
                setUserName(null)
                setMobileNumber(null)
                setEmail(null)
                setPassword(null)
            }
        }
        else {
            showAlert("Error!", "All the fields must be filled", "error");
        }
        setIsLoading(false)
    }

    // Handle admin delete
    const handleDelete = async (id, userType) => {

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

                if (userType === 'admin') {
                    const deleteRes = await axios.delete(`${API_URL}api/admins/${id}`, {
                        headers: { Authorization: jwtToken },
                    });
                    deleteRes.status === 200 && showAlert("Deleted!", "Admin has been deleted.", "success");
                    const response = await axios.get(API_URL + "api/admins");
                    setAllAdmins(response.data);
                }
                else {
                    const deleteRes = await axios.delete(`${API_URL}api/users/${id}`, {
                        headers: { Authorization: jwtToken },
                    });
                    deleteRes.status === 200 && showAlert("Deleted!", "User has been deleted.", "success");
                    const response = await axios.get(API_URL + "api/users");
                    setAllUsers(response.data);
                }
            }
        } catch (error) {
            showAlert("Error!", error, "error");
        } finally {
            setIsLoading(false);
        }

    }

    // handle updata
    const handleUpdateDetail = (id, userType) => {
       console.log(id, userType);
    //    setShow(false);
    }

    // Fetched all admins
    useEffect(() => {
        const getallAdmins = async () => {
            try {
                const response = await axios.get(API_URL + "api/admins");
                setAllAdmins(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        const getallUsers = async () => {
            try {
                const response = await axios.get(API_URL + "api/users");
                setAllUsers(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        getallUsers();
        getallAdmins();
    }, [API_URL]);


    return (
        <div>
            <p className="dashboard-option-title">Add a Member</p>
            <div className="dashboard-title-line"></div>
            <form className="AddUser-form" onSubmit={AddingUser}>
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='User Type'
                        fluid
                        selection
                        options={userTypes}
                        // onChange={settingUserType}
                        onChange={(event, data) => setUserType(data.value)}
                    />
                </div>
                <label className="AddUser-form-label" htmlFor={userType === "Student" ? "userName" : "employeeId"}>User Name<span className="required-field">*</span></label><br />
                <input className="AddUser-form-input" type="text" value={userName} required onChange={(e) => setUserName(e.target.value)}></input><br />

                <label className="AddUser-form-label" htmlFor="userFullName">Name<span className="required-field">*</span></label><br />
                <input className="AddUser-form-input" type="text" name="userFullName" value={userFullName} required onChange={(e) => setUserFullName(e.target.value)}></input><br />

                <label className="AddUser-form-label" htmlFor="email">Email<span className="required-field">*</span></label><br />
                <input className="AddUser-form-input" type="email" value={email} required onChange={(e) => setEmail(e.target.value)}></input><br />

                <label className="AddUser-form-label" htmlFor="mobileNumber">Contact Number<span className="required-field">*</span></label><br />
                <input className="AddUser-form-input" type="text" value={mobileNumber} required onChange={(e) => setMobileNumber(e.target.value)}></input><br />

                {userType === 'admin' && (<>
                    <label className="AddUser-form-label" htmlFor="password">Password<span className="required-field">*</span></label><br />
                    <input className="AddUser-form-input" type="password" value={password} required onChange={(e) => setPassword(e.target.value)}></input><br />
                </>)}



                <input className="AddUser-submit" type="submit" value="SUBMIT" disabled={isLoading} ></input>

            </form>

            {/* all admins */}
            <p className="dashboard-option-title">All Admin Users</p>
            <div className="dashboard-title-line"></div>
            <table className="admindashboard-table">
                <tr>
                    <th>S.No</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {
                    allAdmins && allAdmins.map((admin, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{admin.username}</td>
                                <td>{admin.name}</td>
                                <td>{admin.email.slice(0, 10)}</td>
                                <td>
                                    <Button variant="primary" onClick={handleShow}>
                                        <EditIcon
                                            
                                            onClick={() => handleUpdateDetail(admin._id, 'admin')}
                                        />
                                    </Button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Update Details</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Username"
                                                        value={updateUsername ? updateUsername : admin.username}
                                                        onChange={(e)=>{setUpdateUsername(e.target.value)}}
                                                        autoFocus
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        value={updateName ? updateName : admin.name}
                                                        onChange={(e) =>{setUpdateName(e.target.value)}}
                                                        autoFocus
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                                    <Form.Label>Email address</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        value={updateEmail ? updateEmail : admin.email}
                                                        onChange={(e) =>{setUpdateEmail(e.target.value)}}
                                                        autoFocus
                                                        required
                                                    />
                                                </Form.Group>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={handleUpdateDetail(user._id, "user")}>
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </td>
                                <td>
                                    <Button variant="primary" onClick={() => handleDelete(admin._id, 'admin')} >
                                        <DeleteIcon />
                                    </Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>

            {/* all users */}
            <p className="dashboard-option-title">All Users</p>
            <div className="dashboard-title-line"></div>
            <table className="admindashboard-table">
                <tr>
                    <th>S.No</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {
                    allUsers && allUsers.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.email.slice(0, 10)}</td>
                                <td>
                                    <Button variant="primary" onClick={handleShow}>
                                        <EditIcon
                                            
                                            onClick={() => handleUpdateDetail(user._id, 'user')}
                                        />
                                    </Button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Update Details</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Username"
                                                        value={updateUsername ? updateUsername : user.username}
                                                        onChange={(e)=>{setUpdateEmail(e.target.value)}}
                                                        autoFocus
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        value={updateName ? updateName : user.name}
                                                        onChange={(e) =>{setUpdateName(e.target.value)}}
                                                        autoFocus
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                                    <Form.Label>Email address</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        value={updateEmail ? updateEmail : user.email}
                                                        onChange={(e) =>{setUpdateEmail(e.target.value)}}
                                                        autoFocus
                                                        required
                                                    />
                                                </Form.Group>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={handleUpdateDetail(user._id, "user")}>
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </td>
                                <td>
                                    <Button variant="primary" onClick={() => handleDelete(user._id, 'user')} >
                                        <DeleteIcon />
                                    </Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default AddUser
