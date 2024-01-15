import React, { useContext} from 'react';
// import axios from 'axios';
import { AuthContext } from '../../../../Context/AuthContext';
import "../../MemberDashboard/MemberDashboard.css";
import profile from '../../../../images/profile.png';

function Profile() {
  // const API_URL = process.env.REACT_APP_API_URL;
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="dashboard-option-content">
        <div className="member-profile-content" id="profile@member">
          <div className="user-details-topbar">
            <img
              className="user-profileimage"
              src={profile}
              alt="img"
            ></img>
            <div className="user-info">
              <p className="adminDetails"><span>Name: dsjfdskj</span>{user ? user.name : 'Admin'}</p>
              <p className="user-id"><span>Username: </span>
                {user? user.username : "Admin"}
              </p>
              <p className="user-email"><span>Eamil: </span>{user.email}</p>
              <p className="user-phone"><span>Contact: </span>{user.contactNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
