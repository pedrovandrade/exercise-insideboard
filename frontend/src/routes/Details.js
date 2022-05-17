import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import style from './Details.css';

export default function Details(props) {
  const [player, setPlayer] = useState({});
  const urlParams = useParams();

  useEffect(() => {
    axios.get(
      `${props.apiUrl}/api/data/${urlParams.uuid}`,
      { responseType: 'json' }
    ).then((playerInfo) => {
      setPlayer(playerInfo.data);
    });
  }, []);

  return (
    <main>
      <h1>Details</h1>
      <div className='card-details'>
      { player ? <>
        <img
          src={`${props.apiUrl}/api/pictures/${player.picture}`}
          alt={`${player.firstName} ${player.lastName} photo`}
        />
        <div>
          <p style={{ fontWeight: 'bold' }}>{player.firstName} {player.lastName}</p>
          <p><span className='card-topic'>Birth:</span> {player.birth}</p>
          <p><span className='card-topic'>Position:</span> {player.position}</p>
          <p><span className='card-topic'>Club:</span> {player.club}</p>
          <p><span className='card-topic'>Previous clubs:</span> {
            player.previousClubs ? player.previousClubs.map((club, index) => {
              if (index === player.previousClubs.length - 1) return club;
              return `${club}, `;
            }) : ''
          }</p>
        </div></> : ''}
      </div>
      <Link to='/'>Back</Link>
    </main>
  );
}
