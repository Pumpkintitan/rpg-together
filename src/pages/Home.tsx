import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import Candy from '../assets/curseofthecandywizard_logo.png';
import { useUsername } from '../contexts/Username';

function Home() {
  const [roomcode, setroomcode] = useState('');
  const [, setUsername] = useUsername();

  return (
    <div className='home'>
      <img src={Candy} style={{ height: '400px' }} draggable="false" />
      <h2>Create or join a room below!</h2>
      <form>
        <input
          type="text"
          placeholder="Room Code"
          onChange={(event) => setroomcode(event.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <Link to={`/room/${roomcode}`}>
          <button type="submit">Join room</button>
        </Link>
      </form>
    </div>
  );
}

export default Home;
