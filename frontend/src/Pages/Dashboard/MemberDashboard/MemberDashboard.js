import React, { useContext, useEffect, useState } from "react";
import "../AdminDashboard/AdminDashboard.css";
import "./MemberDashboard.css";

import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HistoryIcon from "@material-ui/icons/History";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import CloseIcon from "@material-ui/icons/Close";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { IconButton } from "@material-ui/core";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import profile from '../../../images/profile.png'

function MemberDashboard() {
  const [active, setActive] = useState("profile");
  const [sidebar, setSidebar] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;
  const { user } = useContext(AuthContext);
  const jwtToken = user.token;

  const [userDetails, setUserDetails] = useState(null);
  const [allTransactions, setAllTransactions] = useState([])

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  // Get user detail
  useEffect(() => {
    const getuserDetails = async () => {
      try {
        const response = await axios.get(
          API_URL + "api/users/" + user._id, {
          headers: { Authorization: jwtToken },
        }
        );
        setUserDetails(response.data);
      } catch (err) {
        console.log("Error in fetching the member details");
      }
    };
    getuserDetails();
  }, [API_URL, user]);


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
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
          <IconButton>
            {sidebar ? (
              <CloseIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />
            ) : (
              <DoubleArrowIcon
                style={{ fontSize: 25, color: "rgb(234, 68, 74)" }}
              />
            )}
          </IconButton>
        </div>
        <div
          className={sidebar ? "dashboard-options active" : "dashboard-options"}
        >
          <div className="dashboard-logo">
            <LibraryBooksIcon style={{ fontSize: 50 }} />
            <p className="logo-name">LCMS</p>
          </div>
          <a
            href="#profile@member"
            className={`dashboard-option ${active === "profile" ? "clicked" : ""
              }`}
            onClick={() => {
              setActive("profile");
              setSidebar(false);
            }}
          >
            <AccountCircleIcon className="dashboard-option-icon" /> User Profile
          </a>

          <a
            href="#history@member"
            className={`dashboard-option ${active === "history" ? "clicked" : ""
              }`}
            onClick={() => {
              setActive("history");
              setSidebar(false);
            }}
          >
            <HistoryIcon className="dashboard-option-icon" /> History
          </a>
          <a
            href="#profile@member"
            className={`dashboard-option ${active === "logout" ? "clicked" : ""
              }`}
            onClick={() => {
              logout();
              setSidebar(false);
            }}
          >
            <PowerSettingsNewIcon className="dashboard-option-icon" /> Log out{" "}
          </a>
        </div>

        <div className="dashboard-option-content">
          <div className="member-profile-content" id="profile@member">
            <div className="user-details-topbar">
              <img
                className="user-profileimage"
                src={profile}
                alt="img"
              ></img>
              <div className="user-info">
                <p className="user-name"><span>Name: </span>{userDetails?.name}</p>
                <p className="user-id"><span>Username: </span>
                  {userDetails?.username
                    ? userDetails?.username
                    : "User"}
                </p>
                <p className="user-email"><span>Eamil: </span>{userDetails?.email}</p>
                <p className="user-phone"><span>Contact: </span>{userDetails?.contactNumber}</p>
              </div>
            </div>
          </div>

          <div
            className="member-reservedbooks-content"
            id="reservedbooks@member"
          >
            <p className="member-dashboard-heading">Issued</p>
            <table className="activebooks-table">
              <tr>
                <th>S.No</th>
                <th>Book Id</th>
                <th>Due Date</th>
                <th>Returned</th>
              </tr>
              {allTransactions.filter((data) => {
                return data.transactionType === "borrowed" && data.userId === user._id;
              })
                .map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.bookId}</td>
                      <td>{data.dueDate}</td>
                      <td>No</td>
                    </tr>
                  );
                })}
            </table>
          </div>
          <div className="member-history-content" id="history@member">
            <p className="member-dashboard-heading">History</p>
            <table className="activebooks-table">
              <tr>
                <th>S.No</th>
                <th>Book Id</th>
                <th>Due Date</th>
                <th>Returned</th>
              </tr>
              {allTransactions.filter((data) => {
                return data.transactionType === "returned" && data.userId === user._id;
              })
                .map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.bookId}</td>
                      <td>{data.dueDate}</td>
                      <td>Yes</td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
