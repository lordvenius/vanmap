import React, { useState } from "react";

import "../css/AppNav.scss";

import { Link } from "react-router-dom";

//import ProfileCard from "./ProfileCard";

function AppNav() {
  return (
    <div className="container">
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
        <li>
          <Link to="/profile">
            <p>Profile</p>
          </Link>
        </li>
        <div>{/*<ProfileCard />*/}</div>
      </ul>
    </div>
  );
}

export default AppNav;
