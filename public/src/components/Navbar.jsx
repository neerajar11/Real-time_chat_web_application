import React from 'react'
import Add from "../img/addAvatar.png";
import { useNavigate } from "react-router-dom";
import Logout from './Logout';

const Navbar = (props) => {
  // console.log(props.currentUser);
  const navigate = useNavigate();
  const handleClick = async () => {
    {
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <div className='navbar'>
      <span className="logo">Globe Chat</span>
      <div className="user">
        <img src={Add} alt="" />
        <span>{props.currentUser ? props.currentUser.username : null}</span>
        <Logout />
      </div>
    </div>
  )
}

export default Navbar
