import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../Utils/Common";

import { useHistory } from "react-router-dom";

const Login = (props) => {
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleLogin() {
    setError(null);
    setLoading(true);
    axios
      .post("http://localhost:4000/users/signin", {
        username: username.value,
        password: password.value,
      })
      .then(function (response) {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        history.push("/dashboard");
      })
      .catch(function (error) {
        //   console.log(error.response)
        //   console.log(error.response)
        if (error && error.response && error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="text-field">
        <label>Username</label>
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div className="text-field"> 
        <label>Password</label>
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />
      <button className="login-button" value={loading ? "Loading..." : "Login"} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
