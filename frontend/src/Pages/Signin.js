import React, { useContext, useState } from 'react'
import '../css/Signin.css'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext.js'
import Switch from '@material-ui/core/Switch';

function Signin() {
    const API_URL = process.env.REACT_APP_API_URL

    const [isUser, setIsUser] = useState(true)
    // for user
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    // for admin
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState("")
    const { dispatch } = useContext(AuthContext)

    const loginCall = async (credentials, dispatch) => {
        dispatch({ type: 'LOGIN_START' });

        try {
            // Choose the appropriate endpoint based on isUser state
            const endpoint = isUser ? 'api/users/login' : 'api/admins/login';

            const res = await axios.post(`${API_URL}${endpoint}`, credentials);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err });
            setError('Wrong Password or Username');
        }
    };

    const handleForm = (e) => {
        e.preventDefault();
        const credentials = isUser ? { name, email } : { username, password };
        loginCall(credentials, dispatch);
    };

    return (
        <div className='signin-container'>
            <div className="signin-card">
                <form onSubmit={handleForm}>
                    <h2 className="signin-title"> Log in</h2>
                    <p className="line"></p>
                    <div className="persontype-question">
                        <p>Are you a Admin member?</p>
                        <Switch
                            onChange={() => setIsUser(!isUser)}
                            color="primary"
                        />
                    </div>
                    <div className="error-message"><p>{error}</p></div>
                    <div className="signin-fields">
                        <label htmlFor={isUser ? "name" : "username"}> <b>{isUser ? "Name" : "Username"}</b></label>
                        <input className='signin-textbox' type="text" placeholder={isUser ? "Enter Name" : "Enter Username"} name={isUser ? "admissionId" : "employeeId"} required onChange={(e) => { isUser ? setName(e.target.value) : setUsername(e.target.value) }} />
                        {!isUser && <><label htmlFor="password"><b>Password</b></label>
                            <input className='signin-textbox' type="password" minLength='5' placeholder="Enter Password" name="psw" required onChange={(e) => { setPassword(e.target.value) }} /></>
                        }
                        {isUser && <><label htmlFor="email"><b>Email</b></label>
                            <input className='signin-textbox' type="email" placeholder="Enter Email" name="email" required onChange={(e) => { setEmail(e.target.value) }} /></>
                        }

                    </div>
                    <button className="signin-button">Log In</button>
                    <a className="forget-pass" href="#home">Forgot password?</a>
                </form>
                <div className='signup-option'>
                    <p className="signup-question">Don't have an account? Contact Librarian</p>
                </div>
            </div>
        </div>
    )
}

export default Signin