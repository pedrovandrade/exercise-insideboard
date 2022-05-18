import React, { useEffect } from 'react';
import FilterPanel from 'components/FilterPanel';
import PlayerCard from 'components/PlayerCard';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setPlayers, filterPlayers } from 'app/features/playerListSlice';

/**
 * The home page of the app. It lists all the players retrieved through the
 * database together with the filter panel to selectively display players.
 * @param       {object} props - Input properties object:
 * @param       {string} props.apiUrl - The backend API base URL.
 * @constructor
 */
export default function HomePage(props) {
  /** **** Redux state variables **** */
  const players = useSelector((state) => state.display.players);
  const name = useSelector((state) => state.filter.name);
  const currentClub = useSelector((state) => state.filter.currentClub);
  const previousClub = useSelector((state) => state.filter.previousClub);
  const position = useSelector((state) => state.filter.position);
  const birthDate = useSelector((state) => state.filter.birthDate);

  const dispatch = useDispatch();

  /** **** React effects **** */
  // On startup, get the data from the server and fill the players
  useEffect(() => {
    axios.get(`${props.apiUrl}/api/data`, { responseType: 'json' }).then((response) => {
      dispatch(setPlayers(response.data));
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  // Events for filtering the players according to their information fields
  useEffect(() => {
    dispatch(filterPlayers({ field: 'firstName', value: name }));
  }, [name]);

  useEffect(() => {
    dispatch(filterPlayers({ field: 'club', value: currentClub }));
  }, [currentClub]);

  useEffect(() => {
    dispatch(filterPlayers({ field: 'previousClubs', value: previousClub }));
  }, [previousClub]);

  useEffect(() => {
    dispatch(filterPlayers({ field: 'position', value: position }));
  }, [position]);

  useEffect(() => {
    dispatch(filterPlayers({ field: 'birth', value: birthDate }));
  }, [birthDate]);

  return (
    <main>
      <h1>Player&lsquo;s list</h1>
      <FilterPanel />
      <button onClick={() => console.log('Add player!')}>+ Add Player</button>
      <div className='card-list'>
        {players.map((player) => (player.visible
          ? <PlayerCard
            key={player.uuid}
            firstName={player.firstName}
            lastName={player.lastName}
            picture={`${props.apiUrl}/api/pictures/${player.picture}`}
            uuid={player.uuid}
          />
          : ''))}
      </div>
    </main>
  );
}
