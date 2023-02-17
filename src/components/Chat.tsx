import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'


type RoomProp = {
  socket: any
}

type Message = {
  id: string,
  user: string,
  value: string,
  time: number
}

function Chat(props: RoomProp) {
  const [messages, setmessages] = useState<Message[]>([])

  const [value, setValue] = useState('');
  const submitForm = (e: any) => {
    e.preventDefault();
    props.socket.emit('message', value);
    setValue('');
  };

  const handleMessage = (message: Message) => {
    props.socket.off('message', handleMessage);
    let tempmess = [...messages]
    let mess = message
    tempmess.push(mess)
    setmessages(tempmess)
  }

  props.socket.on("message", handleMessage)



  return (
    <div>
      <div>
        {messages.map(message => 
        <div className="message" key={message.id}>
          <span className="time">{new Date(message.time).toLocaleTimeString()}</span> &nbsp;&nbsp;
          <span className="username">{message.user}:</span>&nbsp;&nbsp;
          <span className="message-value">{message.value}</span>
        </div>
        )}
      </div>
      <form onSubmit={submitForm}>
      <input type="text" id="outlined-basic" autoFocus value={value} placeholder="Type your message" onChange={(e) => {
            setValue(e.currentTarget.value);
          }}/>
      </form>
    </div>
  );
}

export default Chat;