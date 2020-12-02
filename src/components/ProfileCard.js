import React from "react";
import "../css/ProfileCard.scss";
import { useAuth0 } from "@auth0/auth0-react";
import pic from "../media/guestPic.png";

export default function ProfileCard() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="profile-card-container">
      {!isAuthenticated && (
        <div className="profile-info">
          <img src={pic} alt="guest logo" />
          <h2>Name</h2>
          <p>E-mail address</p>
        </div>
      )}

      {isAuthenticated && (
        <div className="profile-info">
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}
