import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from "axios";
import { registerRoute } from "../utils/APIroutes";

const Register = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: ""
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

    setValues({ ...values, [e.target.name]: e.target.value }); //spread operator
  };

  const isInfoValid = () => {
    const notyf = new Notyf({
      duration: 3000,
      dismissible: true
    });
    if (values.username === "") {
      notyf.error("Please provide username!");
      return false;
    }
    else if (values.username.length > 30) {
      notyf.error("Please provide username of length less than 30!")
      return false;
    }
    else if (values.email === "") {
      notyf.error("Please provide email!");
      return false;
    }
    else if (values.password !== values.confirmPassword) {
      notyf.error("Password and Confirm password are not same!");
      return false;
    }
    else if (values.password.length < 8) {
      notyf.error("Password length should be greater than or equal to 8!");
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
    const { username, email, password, confirmPassword, profilePic } = values;
    if (isInfoValid()) {
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        profilePic
      });

      if (data.status === false) {
        notyf.error(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem(
          "chat-app-current-user",
          JSON.stringify(data.user)
        );
        navigate("/home");
      }
    }
    else {
      console.log("Form rejected");
    }
  };



  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Globe Chat</span>
        <span className="title">Register</span>
        <form >
          <input
            required type="text"
            name="username"
            value={values.username}
            placeholder="Username"
            onChange={(event) => handleChange(event)}
          />
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
          <input
            required type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            placeholder="Confirm Password"
            onChange={(event) => handleChange(event)}
          />
          <input
            required style={{ display: "none" }}
            type="file"
            name="avatar"
            value={values.profilePic}
            id="file"
            onChange={(event) => handleChange(event)}
          />
          {/* <label htmlFor="file">
                <img src={Add} alt="" />
                <span>Add a Profile Image</span>
                <input type="file" name="profilePic"  onClick={(event) => handleChange(event)}></input>
            </label> */}
          <Link to="/home"><button onClick={(e) => handleSubmit(e)}>Sign up</button></Link>
        </form>
        <p>
          You do have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
