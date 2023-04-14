import React, { useState, useEffect, useRef, ReactNodeArray } from 'react';
import reactStringReplace from 'react-string-replace';
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
  nodeArray: ReactNodeArray;
  color: string;
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
    if (message.type == 'server') {
      message.nodeArray = getUsers(message);
    } else {
      message.color = genColor(message.user);
    }
    setmessages([...messages, message]);
  };

  const genColor = (name: string): string => {
    let total: number = 0;
    for (const char of name) {
      total += char.charCodeAt(0);
    }
    return `hsl(${total % 360},100%,40%)`;
  };

  const getUsers = (message: Message) => {
    const users = message.user.split('|');
    let newMessage = reactStringReplace(message.value);
    for (const user of users) {
      if (user != '') {
        newMessage = reactStringReplace(newMessage, user, (match, i) => (
          <span style={{ color: genColor(match) }}>{match}</span>
        ));
      }
    }
    return newMessage;
  };

  props.socket.on('message', handleMessage);

  return (
    <div className="chat-box">
      <div id="message-holder">
        {messages.map((message) => {
          if (message.type == 'user') {
            return (
              <div className="message" key={message.id}>
                <span className="time">
                  {new Date(message.time).toLocaleTimeString([], {
                    timeStyle: 'short',
                  })}
                </span>
                &nbsp;&nbsp;
                <span className="username" style={{ color: message.color }}>
                  {message.user}
                </span>
                :&nbsp;
                <span className="message-value">{message.value}</span>
              </div>
            );
          } else if (message.type == 'server') {
            return (
              <div className="message" key={message.id}>
                <span className="time">
                  {new Date(message.time).toLocaleTimeString([], {
                    timeStyle: 'short',
                  })}
                </span>
                &nbsp;&nbsp;
                <span className="message-value">{message.nodeArray}</span>
              </div>
            );
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
