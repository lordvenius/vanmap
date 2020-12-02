import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../css/Login.scss";

function Login() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <div className="login-btn-container">
          <p>Logout</p>
          <input
            class="tgl tgl-ios"
            id="cb3"
            type="checkbox"
            checked
            onClick={() => logout()}
          />
          <label class="tgl-btn" for="cb3"></label>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="login-btn-container">
          <p>Login</p>
          <input
            class="tgl tgl-ios"
            id="cb3"
            type="checkbox"
            onClick={() => loginWithRedirect()}
          />
          <label class="tgl-btn" for="cb3"></label>
        </div>
      </>
    );
  }
}

export default Login;
