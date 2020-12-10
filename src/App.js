import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import store from "./store";

import "./App.scss";
import Profile from "./components/Profile";
import AppNav from "./components/AppNav";
import Home from "./components/Home";
import MapPage from "./components/MapPage.js";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  // If sign in is loading, "loading..." is displayed in browser
  const { isLoading } = useAuth0();
  //if (isLoading) return <div>loading...</div>;
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <AppNav></AppNav>

          <div className="page-container">
            <Switch>
              <Route path={"/"} exact component={Home} />

              <Route path={"/map"} component={MapPage} />

              <Route path={"/profile"} component={Profile} />

              <Route path={"/about"} component={About} />
            </Switch>
          </div>

          <Footer className="footer"></Footer>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
