import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import RPG from '../assets/rpglogo_goofy.png';

type RoomProp = {
  socket: any;
};

function Nav(props: RoomProp) {
  return (
    <div className="nav">
      <Link to={`/`}>
        <img
          src={RPG}
          style={{ height: '60px', paddingLeft: '10px' }}
          draggable="false"
        />
      </Link>
    </div>
  );
}

export default Nav;
