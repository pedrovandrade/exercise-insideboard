import React, { useEffect, useState } from 'react';
import FilterPanel from 'components/FilterPanel';
import AddPanel from 'components/AddPanel';
import PlayerCard from 'components/PlayerCard';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setPlayers } from 'app/features/playerListSlice';

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

  const dispatch = useDispatch();

  const [addPanelVisible, setAddPanelVisible] = useState(false);

  function toogleAddPanelVisibility() {
    setAddPanelVisible(!addPanelVisible);
  }

  /** **** React effects **** */
  // On startup, get the data from the server and fill the players
  useEffect(() => {
    axios.get(`${props.apiUrl}/api/data`, { responseType: 'json' }).then((response) => {
      dispatch(setPlayers(response.data));
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <main>
      <h1>Player&lsquo;s list</h1>
      <FilterPanel />
      <button
        onClick={toogleAddPanelVisibility}
      >
        {addPanelVisible ? 'Cancel' : '+ Add Player'}
      </button>
      { addPanelVisible ? <AddPanel apiUrl={props.apiUrl}/> : '' }
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
