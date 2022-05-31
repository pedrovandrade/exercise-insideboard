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
 * @constructor
 */
export default function HomePage() {
  /** **** Redux state variables **** */
  const players = useSelector((state) => state.display.players);
  const apiUrl = useSelector((state) => state.network.apiUrl);

  const dispatch = useDispatch();

  const [addPanelVisible, setAddPanelVisible] = useState(false);

  function toogleAddPanelVisibility() {
    setAddPanelVisible(!addPanelVisible);
  }

  /** **** React effects **** */
  // On startup, get the data from the server and fill the players
  useEffect(() => {
    axios.get(`${apiUrl}/api/data`, { responseType: 'json' }).then((response) => {
      dispatch(setPlayers(response.data));
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <main>
      <h1>Player&lsquo;s list</h1>
      <FilterPanel />
      <button onClick={toogleAddPanelVisibility}>
        {addPanelVisible ? 'Cancel' : '+ Add Player'}
      </button>
      { addPanelVisible ? <AddPanel /> : '' }
      <div className='card-list'>
        {players.map((player) => (player.visible
          ? <PlayerCard
            key={player.uuid}
            firstName={player.firstName}
            lastName={player.lastName}
            picture={`${apiUrl}/api/pictures/${player.picture}`}
            uuid={player.uuid}
          />
          : ''))}
      </div>
    </main>
  );
}
