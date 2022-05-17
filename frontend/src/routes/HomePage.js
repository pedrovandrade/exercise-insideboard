import React, { useState, useEffect } from 'react';
import FilterPanel from 'components/FilterPanel';
import PlayerCard from 'components/PlayerCard';
import axios from 'axios';

export default function HomePage(props) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // axios.get('/public/data/players.json', { responseType: 'json' }).then((response) => {
    axios.get(`${props.apiUrl}/api/data`, { responseType: 'json' }).then((response) => {
      console.log('response:', response);
      setPlayers(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <main>
      <h1>Player&lsquo;s list</h1>
      <FilterPanel />
      <button onClick={() => console.log('Add player!')}>+ Add Player</button>
      <div className='card-list'>
        {players.map((player) => (
          <PlayerCard
            key={player.uuid}
            firstName={player.firstName}
            lastName={player.lastName}
            picture={`${props.apiUrl}/api/pictures/${player.picture}`}
            uuid={player.uuid}
          />
        ))}
      </div>
    </main>
  );
}
