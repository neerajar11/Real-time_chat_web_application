import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from "axios";
import { loginRoute } from "../utils/APIroutes";

const Login = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value }); //spread operator
  };

  const isInfoValid = () => {
    const notyf = new Notyf({
      duration: 3000,
      dismissible: true
    });
    if (values.email === "") {
      notyf.error("Please provide email to login!")
      return false;
    }
    else if (values.password === "") {
      notyf.error("Please provide password!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notyf = new Notyf({
      duration: 3000,
      dismissible: true
    });

    if (isInfoValid()) {
      const { email, password } = values;
      const { data } = await axios.post(loginRoute, {
        email,
        password
      })

      if (data.status === false) {
        notyf.error(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem(
          "chat-app-current-user",
          JSON.stringify(data.user)
        );
        console.log("Login Successful");
        navigate("/home");
      }
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Globe Chat</span>
        <span className="title">Login</span>
        <form>
          <input
            required type="email"
            name="email"
            value={values.email}
            placeholder="Email"
            onChange={(event) => handleChange(event)}
          />
          <input
            required type="password"
            name="password"
            value={values.password}
            placeholder="Password"
            onChange={(event) => handleChange(event)}
          />
          <Link to="/home"><button onClick={(e) => handleSubmit(e)}>Sign in</button></Link>
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
