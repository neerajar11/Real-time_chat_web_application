import React, { useState, useRef, useEffect } from "react";
import Attach from "../img/attach.png";
import axios from "axios";
import {fileSend} from "../utils/APIroutes";

const Input = ({ handleSendMsg }) => {

  const [msg, setMsg] = useState("");
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");

  const fileRef = useRef();

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  useEffect(() => {
    const getFile = async() => {
      if(file){
        const data = new FormData();
        data.append("name",file.name);
        data.append("file",file);

        const res = await axios.post( fileSend, data );
        setResult(res.data.path);
        if(result) handleSendMsg(result);
        setMsg("");
      }
    }
    getFile();
  },[file])

  const handleFileClick = () => {
    fileRef.current.click();
  }

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setMsg(e.target.value)}
        value={msg} />
      <div className="send" >
        <input type="image" src={Attach} alt="" onClick={() => handleFileClick()}/>
        <input 
          type="file" 
          style={{ display: "none" }} 
          id="file" 
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={(event) => sendChat(event)}>Send</button>
      </div>
    </div>
  );
};

export default Input;
