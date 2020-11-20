import React, { useState } from "react";

import { Link } from "react-router-dom";

function AppNav() {
  return (
    <div className="container">
      <div className="ul-div">
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
        </ul>
      </div>
    </div>
  );
}

export default AppNav;
