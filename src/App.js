import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Link,
  Route,
} from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { getToken, removeUserSession, setUserSession } from "./Utils/Common";
import axios from "axios";
import './App.css';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:4000/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <div>
            <Link exact to="/">
              Home
            </Link>
          </div>
          <div>
            <Link to="/login">Login</Link>
            <small>(Access without token only)</small>
          </div>
          <div>
            <Link to="/dashboard">Dashboard</Link>
            <small>(Access with token only)</small>
          </div>
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route>
              <Redirect to="/login" />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
