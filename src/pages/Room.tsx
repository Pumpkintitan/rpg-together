import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useUsername } from '../contexts/Username';

import Chat from "../components/Chat"


type RoomProp = {
  roomid: string
  socket: any
}


function Room(props: RoomProp) {
  const [username,] = useUsername()

  useEffect(() => {
    props.socket.emit("joinroom", { roomid: props.roomid, username: username })
  }, [props.socket]);

  return (
    <div className='room'>
      <h1 style={{ textAlign: 'center' }}>{props.roomid} - {username}</h1>
      <div className='container'>
        <div>
          <div style={{ height: "500px", width: "700px", backgroundColor: "#ffdddd" }}></div>
          <div style={{ height: "200px", width: "700px", backgroundColor: "#ddffdd" }}></div>
        </div>
        <Chat socket={props.socket} />
      </div>
    </div>
  );
}

export default Room;