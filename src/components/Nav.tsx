import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client'
import styled from 'styled-components'
import RPG from "../assets/rpglogo_goofy.png"

type RoomProp = {
  socket: any
}

const TheNav = styled.div`
    padding: 0 10px;
    margin: 0;
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    background-color: #eee;

`

function Nav(props: RoomProp) {
  



  return (
    <TheNav>
        <Link to={`/`}>
            <img src={RPG} style={{height: "60px"}} draggable="false"/>
        </Link>
    </TheNav>
  );
}

export default Nav;