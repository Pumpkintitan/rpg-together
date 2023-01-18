import './Home.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import Slime from "../../assets/slime.png"
import { useUsername } from '../../contexts/Username';

import Button from '@mui/material/Button';

function Home() {
    const [roomcode, setroomcode] = useState(String)
    const [, setUsername] = useUsername()

    return (
        <div>
            <h1>
                Welcome to RPG Together!
            </h1>
            <img src={Slime} draggable="false"/>
            <h2>
                Create or join a room below!
            </h2>
            <form>
                <input type="text" placeholder='Room Code' onChange={(event) => {
                    setroomcode(event.target.value)
                }} />
                <input type="text" placeholder='Username' onChange={(event) => {
                    setUsername(event.target.value)
                }} />
                <Link to={`/room/${roomcode}`}>
                    <Button variant="contained" type="submit">
                        Join room
                    </Button>
                </Link>
            </form>
        </div>
    )
}

export default Home