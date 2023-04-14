import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useUsername } from '../contexts/Username';

import Chat from '../components/Chat';
import Controls from '../components/Controls';
import Game from '../components/Game';

type RoomProp = {
  roomid: string;
  socket: any;
};

function Room(props: RoomProp) {
  const [username] = useUsername();

  useEffect(() => {
    console.log(props.socket);
    props.socket.emit('joinroom', { roomid: props.roomid, username: username });
  }, [props.socket]);

  return (
    <div className="room">
      <h1 style={{ textAlign: 'center' }}>
        {props.roomid} - {username}
      </h1>
      <div className="container">
        <div>
          <Game />
          <Controls socket={props.socket} />
        </div>
        <Chat socket={props.socket} />
      </div>
    </div>
  );
}

export default Room;
