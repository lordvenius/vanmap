import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Provider } from "react-redux";

import store from "./store";

import "./App.sass";
import Profile from "./components/Profile";
import AppNav from "./components/AppNav";
import Home from "./components/Home";
import MapPage from "./components/MapPage";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
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
