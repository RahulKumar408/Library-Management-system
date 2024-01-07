import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../Context/AuthContext';
import "../../MemberDashboard/MemberDashboard.css";
import profile from '../../../../images/profile.png';

function Profile() {
    const API_URL = process.env.REACT_APP_API_URL;
  const { user } = useContext(AuthContext);
  const jwtToken = user.token;
  const [adminDetails, setAdminDetails] = useState(null);

  useEffect(() => {
    const getadminDetails = async () => {
      try {
        const response = await axios.get(
          API_URL + "api/admins/" + user._id, {
            headers: { Authorization: jwtToken },
          }
        );
        setAdminDetails(response.data);
      } catch (err) {
        console.log("Error in fetching the member details");
      }
    };
    getadminDetails();
  }, [API_URL, user]);

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
                            <p className="user-name"><span>Name: </span>{adminDetails?.name}</p>
                            <p className="user-id"><span>Username: </span>
                                {adminDetails?.username
                                    ? adminDetails?.username
                                    : "Admin"}
                            </p>
                            <p className="user-email"><span>Eamil: </span>{adminDetails?.email}</p>
                            <p className="user-phone"><span>Contact: </span>{adminDetails?.contactNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
