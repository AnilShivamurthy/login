import React, { useState } from "react";
import { getUser, removeUserSession } from "../Utils/Common";

import { useHistory } from "react-router-dom";

const Dashboard = (props) => {
  const user = getUser();
  const history = useHistory();

  function handleLogout() {
    removeUserSession();
  history.push("/login");
  }

  return (
    <div className="login">
      <h1>Welcome {user && user.name}</h1>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
