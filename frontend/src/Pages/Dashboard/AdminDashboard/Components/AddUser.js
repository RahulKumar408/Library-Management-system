import React, {useContext, useEffect, useState } from 'react';
import "../AdminDashboard.css";
import axios from "axios";
import { Dropdown } from 'semantic-ui-react';
import { AuthContext } from '../../../../Context/AuthContext';
import "react-datepicker/dist/react-datepicker.css";

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

    const userTypes = [
        { value: 'user', text: 'User' },
        { value: 'admin', text: 'Admin' }
    ]

    //Add a User
    const AddUser = async (e) => {
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
                } else {
                    response = await axios.post(API_URL + "api/users/add", userData, {
                        headers: { Authorization: jwtToken },
                    });
                }
                // const response = await axios.post(API_URL + "api/auth/register", userData)
                setUserFullName(null)
                setUserType("Student")
                setUserName(null)
                setMobileNumber(null)
                setEmail(null)
                setPassword(null)
                alert("Member Added")
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            alert("All the fields must be filled")
        }
        setIsLoading(false)
    }

    return (
        <div>
            <p className="dashboard-option-title">Add a Member</p>
            <div className="dashboard-title-line"></div>
            <form className="AddUser-form" onSubmit={AddUser}>
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
                <input className="AddUser-form-input" type="text" value={userName} required onChange={(e) => setUserName(e.target.value) }></input><br />

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
        </div>
    )
}

export default AddUser
