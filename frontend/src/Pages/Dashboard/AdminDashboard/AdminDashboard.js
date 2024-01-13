import React, { useState, useContext } from 'react'
import "./AdminDashboard.css"
import AddTransaction from './Components/AddTransaction'
import AddUser from './Components/AddUser'
import AddBook from './Components/AddBook';
import GetBooks from './Components/GetBooks';
import AllTransaction from './Components/AllTransaction';
import Profile from './Components/Profile';

import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BookIcon from '@material-ui/icons/Book';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { AuthContext } from "../../../Context/AuthContext";


/* Semantic UI Dropdown Styles Import */
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function AdminDashboard() {

    const [active, setActive] = useState("addbooks")
    const [sidebar, setSidebar] = useState(false)

    const API_URL = process.env.REACT_APP_API_URL;
    const { user } = useContext(AuthContext);
    const jwtToken = user.token;
    // console.log("Printing user")
    // console.log(user)

    /* Logout Function*/
    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }

    // Get user detail
    // useEffect(() => {
    //     const getuserDetails = async () => {
    //         try {
    //             const response = await axios.get(
    //                 API_URL + "api/users/" + user._id, {
    //                 headers: { Authorization: jwtToken },
    //             }
    //             );
    //             setUserDetails(response.data);
    //         } catch (err) {
    //             console.log("Error in fetching the member details");
    //         }
    //     };
    //     getuserDetails();
    // }, [API_URL]);

    return (
        <div className="dashboard">
            <div className="dashboard-card">
                <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
                    <IconButton>
                        {sidebar ? <CloseIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} /> : <DoubleArrowIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />}
                    </IconButton>
                </div>

                {/* Sidebar */}
                <div className={sidebar ? "dashboard-options active" : "dashboard-options"}>
                    <div className='dashboard-logo'>
                        <LibraryBooksIcon style={{ fontSize: 50 }} />
                        <p className="logo-name">LCMS</p>
                    </div>
                    <p className={`dashboard-option ${active === "profile" ? "clicked" : ""}`} onClick={() => { setActive("profile"); setSidebar(false) }}><AccountCircleIcon className='dashboard-option-icon' /> Profile</p>
                    <p className={`dashboard-option ${active === "addbook" ? "clicked" : ""}`} onClick={() => { setActive("addbook"); setSidebar(false) }}><BookIcon className='dashboard-option-icon' />Add Book</p>
                    <p className={`dashboard-option ${active === "addtransaction" ? "clicked" : ""}`} onClick={() => { setActive("addtransaction"); setSidebar(false) }}><ReceiptIcon className='dashboard-option-icon' /> Add Transaction </p>
                    <p className={`dashboard-option ${active === "AddUser" ? "clicked" : ""}`} onClick={() => { setActive("AddUser"); setSidebar(false) }}><PersonAddIcon className='dashboard-option-icon' /> Add User </p>
                    <p className={`dashboard-option ${active === "GetBooks" ? "clicked" : ""}`} onClick={() => { setActive("GetBooks"); setSidebar(false) }}><AccountBoxIcon className='dashboard-option-icon' /> Get Books </p>
                    {/* <p className={`dashboard-option ${active === "AddUser" ? "clicked" : ""}`} onClick={() => { setActive("AddUser"); setSidebar(false) }}><PersonAddIcon className='dashboard-option-icon' /> Add Member </p> */}
                    <p className={`dashboard-option ${active === "returntransaction" ? "clicked" : ""}`} onClick={() => { setActive("returntransaction"); setSidebar(false) }}><AssignmentReturnIcon className='dashboard-option-icon' /> Return </p>
                    <p className={`dashboard-option`} onClick={logout}><PowerSettingsNewIcon className='dashboard-option-icon' /> Log out </p>

                </div>
                <div className="dashboard-option-content">
                    <div className="dashboard-addbooks-content" style={active !== "profile" ? { display: 'none' } : {}}>
                        <Profile />
                    </div>
                    <div className="dashboard-addbooks-content" style={active !== "addbook" ? { display: 'none' } : {}}>
                        <AddBook />
                    </div>
                    <div className="dashboard-transactions-content" style={active !== "addtransaction" ? { display: 'none' } : {}}>
                        <AddTransaction />
                    </div>
                    <div className="dashboard-AddUser-content" style={active !== "AddUser" ? { display: 'none' } : {}}>
                        <AddUser />
                    </div>
                    <div className="dashboard-AddUser-content" style={active !== "GetBooks" ? { display: 'none' } : {}}>
                        <GetBooks />
                    </div>
                    <div className="dashboard-AddUser-content" style={active !== "returntransaction" ? { display: 'none' } : {}}>
                        <AllTransaction />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard