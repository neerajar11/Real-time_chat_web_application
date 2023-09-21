import React, { useState, useEffect, useRef } from "react";
import Messages from "./Messages";
import Input from "./Input";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIroutes";

const Chat = ({ currentChat, currentUser, socket }) => {

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    async function f() {
      const data = await JSON.parse(
        localStorage.getItem("chat-app-current-user")
      );
      const response = await axios.post(recieveMessageRoute, {
        from: currentChat ? data._id : null,
        to: currentChat ? currentChat._id : null,
      });
      setMessages(response.data);
    }
    f();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem("chat-app-current-user")
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("chat-app-current-user")
    );
    socket.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  socket.on("msg-recieve", (msg) => {
    // console.log(msg);
    setArrivalMessage({ fromSelf: false, message: msg });
  });


  useEffect(() => {
    // console.log(arrivalMessage);
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);

  }, [arrivalMessage]);


  // console.log(contacts);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{currentChat ? currentChat.username : "Welcome!"}</span>
      </div>
        <Messages messages={messages} currentChat={currentChat}/>
        {currentChat ? <Input handleSendMsg={handleSendMsg} /> : null}
    </div>
  );
};

export default Chat;
