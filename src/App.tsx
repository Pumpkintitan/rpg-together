import React, { useState } from 'react'
import { Routes, Route, useParams } from "react-router-dom";
import io from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom'
import { UsernameContext } from "./contexts/Username";

import Home from './pages/Home'
import Room from './pages/Room'
import Nav from './components/Nav';

const newSocket = io("ws://localhost:8080");

function App() {
  return (
    <UsernameContext.Provider value={React.useState("Anon")}>
      <BrowserRouter>
        <Nav socket={newSocket} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomid" element={<RoomLoad />} />
        </Routes>
      </BrowserRouter>
    </UsernameContext.Provider>
  );
}

function RoomLoad() {
  let params = useParams();
  return (
    <Room roomid={params.roomid!} socket={newSocket} />
  )
}

export default App;