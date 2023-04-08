import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

type RoomProp = {
  socket: any;
};

type Message = {
  type: string;
  id: string;
  user: string;
  value: string;
  time: number;
};

function Chat(props: RoomProp) {
  const [messages, setmessages] = useState<Message[]>([]);
  const [value, setValue] = useState('');

  const submitForm = (e: any) => {
    e.preventDefault();
    if (value != '') {
      props.socket.emit('message', value);
    }
    setValue('');
  };

  useEffect(() => {
    const element = document.getElementById('message-holder');
    if (element) {
      if (
        element.scrollTop + element.clientHeight >=
        element.scrollHeight - 300
      ) {
        element.scrollTop = element.scrollHeight;
      }
    }
  }, [messages]);

  const handleMessage = (message: Message) => {
    props.socket.off('message', handleMessage);
    setmessages([...messages, message]);
  };

  props.socket.on('message', handleMessage);

  return (
    <div className="chat-box">
      <div id="message-holder">
        {messages.map((message) => {
          if (message.type == "user") {
            return (
              <div className="message" key={message.id}>
                <span className="time">
                  {new Date(message.time).toLocaleTimeString([], { timeStyle: "short", })}
                </span>
                &nbsp;&nbsp;
                <span className="username">{message.user}:</span>&nbsp;
                <span className="message-value">{message.value}</span>
              </div>
            )
          } else if (message.type == "server") {
            return (
              <div className="message" key={message.id}>
                <span className="time">
                  {new Date(message.time).toLocaleTimeString([], { timeStyle: "short", })}
                </span>
                &nbsp;&nbsp;
                <span className="message-value">{message.value}</span>
              </div>
            )
          }
        })}
      </div>
      <form onSubmit={submitForm} className="chat-input">
        <input
          type="text"
          autoFocus
          value={value}
          placeholder="Type your message"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      </form>
    </div>
  );
}

export default Chat;
