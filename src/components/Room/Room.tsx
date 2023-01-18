import './Room.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useUsername } from '../../contexts/Username';

import Chat from "../Chat/Chat"


type RoomProp = {
  roomid: string
  socket: any
}


function Room(props:RoomProp) {
  const [username,] = useUsername()

  useEffect(() => {
    props.socket.emit("joinroom", {roomid: props.roomid, username: username})
  }, [props.socket]);

  return (
    <div>
      <h1>{props.roomid} - {username}</h1>
      <Chat socket={props.socket}/>
    </div>
  );
}

export default Room;