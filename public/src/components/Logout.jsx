import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutRoute } from "../utils/APIroutes";


export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem("chat-app-current-user")
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <button onClick={handleClick}>
      Logout
    </button>
  );
}
