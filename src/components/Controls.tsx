import React, { useState, useEffect, useRef } from 'react';

type ControlProp = {
  socket: any;
};

function Controls(props: ControlProp) {
  const sendEvent = () => {
    props.socket.emit('event', {
      player: 'bro',
      action: 'attack',
      target: 'goblin 1',
    });
  };

  return (
    <div className="controls-container">
      <button className="action" onClick={() => sendEvent()}>
        Send event
      </button>
    </div>
  );
}

export default Controls;
