import React, { useState, useEffect } from "react";

const Chats = ({ contacts, handleChatChange }) => {

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    async () => {
      const data = await JSON.parse(
        localStorage.getItem("chat-app-current-user")
      );
      setCurrentUserName(data.username);
      // setCurrentUserImage(data.profilePic);
    }
  }, []);

  const changeCurrentChat = (index, contact) => {
    // console.log(index);
    setCurrentSelected(index);
    handleChatChange(contact)
  };
  return (
    <div >
      {contacts.map((contact, index) => {
        return (
          <div key={contact._id} className="userChat " onClick={() => changeCurrentChat(index, contact)}>
            <div
              className={`userChatInfo userchat`}
            >
              <span><h3>{contact.username}</h3></span>
            </div>
          </div>
        )
      }
      )}
    </div>
  );
};

export default Chats;
