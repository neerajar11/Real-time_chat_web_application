import React, { useEffect, useRef } from "react";


const Message = ({ message, messages }) => {

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (

    <div className={`message ${message.fromSelf ? "owner" : null}`} ref={scrollRef}>
      <div className="messageContent">
        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default Message;
