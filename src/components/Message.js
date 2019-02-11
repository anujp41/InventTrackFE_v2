import React, { useEffect } from 'react';
import './Message.css';

const Message = ({ msgBody, handleMsg }) => {
  useEffect(() => {
    setTimeout(() => handleMsg(false), 2000);
  });
  return <h2 className="info-message">{msgBody}</h2>;
};

export default Message;
