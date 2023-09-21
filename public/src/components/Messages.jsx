import Message from "./Message";
import uuid4 from "uuid4";

const Messages = ({ messages, currentChat }) => {
  return (
    <div className="messages">
      {currentChat ? messages.map((message) => {

        return (
          <Message message={message} messages={messages} key={uuid4()} />
        )
      }) : null}
    </div>
  );
};

export default Messages;
