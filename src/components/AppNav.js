import React, { useState } from "react";
import "../css/AppNav.scss";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileCard from "./ProfileCard";
import LogIn from "./Login";
import pic from "../media/guest.png";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AppNav() {
  const [userStyle, setUserStyle] = useState("hidden");
  const { isAuthenticated, user } = useAuth0();

  const toggleProfile = () => {
    if (userStyle === "hidden") {
      setUserStyle("");
    } else {
      setUserStyle("hidden");
    }
  };
  return (
    <div className="containerr">
      <DropdownButton
        id="dropdown-item-button"
        title="Menu"
        className="dropdown"
      >
        <Dropdown.Item as="button">
          <Link to="/">
            <p>Home</p>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item as="button">
          <Link to="/map">
            <p>Map</p>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item as="button">
          <Link to="/about">
            <p>About</p>
          </Link>
        </Dropdown.Item>
      </DropdownButton>
      <ul className="nav-ul">
        <li>
          <Link to="/">
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link to="/map">
            <p>Map</p>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <p>About</p>
          </Link>
        </li>
      </ul>
      <div className="nav-profile-pic">
        <LogIn />
        {!isAuthenticated && (
          <img src={pic} alt="Profile picture" onClick={toggleProfile} />
        )}
        {isAuthenticated && (
          <img
            src={user.picture}
            alt="Profile picture"
            onClick={toggleProfile}
          />
        )}
      </div>
      <div className={userStyle}>
        <ProfileCard />
      </div>
    </div>
  );
}

export default AppNav;
