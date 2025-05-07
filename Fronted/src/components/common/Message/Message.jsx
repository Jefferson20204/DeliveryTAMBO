import React from "react";
import "./Message.css";

const Message = ({ type, message }) => {
  let messageClass = "";

  // Determinar las clases según el tipo de mensaje
  switch (type) {
    case "success":
      messageClass = "message success";
      break;
    case "error":
      messageClass = "message error";
      break;
    default:
      messageClass = "message";
  }

  return <div className={messageClass}>{message}</div>;
};

export default Message;
