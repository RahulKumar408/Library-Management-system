import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/Header.css'

import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.js"

function Header() {

    const { user } = useContext(AuthContext);
    
    const [menutoggle, setMenutoggle] = useState(false)

    const Toggle = () => {
        setMenutoggle(!menutoggle)
    }

    const closeMenu = () => {
        setMenutoggle(false)
    }

    return (
        <div className="header">
            <div className="logo-nav">
            <Link to='/'>
                <a href="#home">LIBRARY</a>
            </Link>
            </div>
            <div className='nav-right'>
                <input className='search-input' type='text' placeholder='Search a Book'/>
                <ul className={menutoggle ? "nav-options active" : "nav-options"}>
                    <li className="option" onClick={() => { closeMenu() }}>
                        <Link to='/'>
                            <a href="#home">Home</a>
                        </Link>
                    </li>
                    <li className="option" onClick={() => { closeMenu() }}>
                        <Link to='/books'>
                        <a href="#books">Books</a>
                        </Link>
                    </li>
                    <li className="option" onClick={() => { closeMenu() }}>
                        <Link to='/signin'>
                        <a href='signin'>{user ? (user.isAdmin? 'Admin' : user.username) : 'SignIn'}{user && <AccountCircleIcon className="dashboard-option-icon" style={{ fontSize: 35 }} />}</a>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="mobile-menu" onClick={() => { Toggle() }}>
                {menutoggle ? (
                    <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
                ) : (
                    <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
                )}
            </div>
        </div>
    )
}

export default Header
