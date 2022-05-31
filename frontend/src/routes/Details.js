import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import EditableAttribute from 'components/EditableAttribute';
import {
  writeFirstName,
  writeLastName,
  writeCurrentClub,
  writePreviousClubs,
  writePosition,
  writeBirthDate,
  setUUID,
} from 'app/features/editPlayerSlice';
import style from './Details.css';

/**
 * The individual player's details page template. It selects the player through
 * the URL end (corresponding to the player's uuid) and shows all his
 * information as well as his picture.
 * @constructor
 */
export default function Details() {
  const apiUrl = useSelector((state) => state.network.apiUrl);
  const [player, setPlayer] = useState({});
  const urlParams = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(
      `${apiUrl}/api/data/${urlParams.uuid}`,
      { responseType: 'json' }
    ).then((playerInfo) => {
      setPlayer(playerInfo.data);
      dispatch(writeFirstName(playerInfo.data.firstName));
      dispatch(writeLastName(playerInfo.data.LastName));
      dispatch(writeBirthDate(playerInfo.data.birth));
      dispatch(writePosition(playerInfo.data.position));
      dispatch(writeCurrentClub(playerInfo.data.club));
      playerInfo.data.previousClubs.forEach((value, index) => {
        dispatch(writePreviousClubs({
          value,
          index,
        }));
      });
      dispatch(setUUID(playerInfo.data.uuid));
    });
  }, []);

  return (
    <main>
      <h1>Details</h1>
      <div className='card-details'>
      { player ? <>
        <img
          src={`${apiUrl}/api/pictures/${player.picture}`}
          alt={`${player.firstName} ${player.lastName} photo`}
          className='card-details-photo'
        />
        <div>
          <div className='details-topic-container'>
            <p style={{ fontWeight: 'bold' }}>
              <EditableAttribute attribute='firstName' content={player.firstName}/>
              <EditableAttribute attribute='lastName' content={player.lastName}/>
            </p>
          </div>
          <div className='details-topic-container'>
            <p>
              <span className='card-topic'>Birth: </span>
              <EditableAttribute attribute='birth' content={player.birth}/>
            </p>
          </div>
          <div className='details-topic-container'>
            <p>
              <span className='card-topic'>Position: </span>
              <EditableAttribute attribute='position' content={player.position}/>
            </p>
          </div>
          <div className='details-topic-container'>
            <p>
              <span className='card-topic'>Club: </span>
              <EditableAttribute attribute='club' content={player.club}/>
            </p>
          </div>
          <div className='details-topic-container'>
            <div>
              <span className='card-topic'>Previous clubs: </span>
              <ul>
              {
                player.previousClubs ? player.previousClubs.map((club, index) => {
                  return (
                    <li key={index}>
                      <EditableAttribute attribute='previousClubs' index={index} content={club}/>
                    </li>
                  );
                }) : ''
              }
              </ul>
            </div>
          </div>
        </div>
        </> : ''}
      </div>
      <Link to='/'>Back</Link>
    </main>
  );

  // return (
  //   <main>
  //     <h1>Details</h1>
  //     <div className='card-details'>
  //     { player ? <>
  //       <img
  //         src={`${apiUrl}/api/pictures/${player.picture}`}
  //         alt={`${player.firstName} ${player.lastName} photo`}
  //         className='card-details-photo'
  //       />
  //       <div>
  //         { editable.name
  //           ? <input
  //             type='text'
  //             value=''
  //             data-key='name'
  //             onBlur={disableEditable}
  //           />
  //           : <div className='details-topic-container'>
  //               <p style={{ fontWeight: 'bold' }}>{player.firstName} {player.lastName}</p>
  //               <img
  //                 className='edit-icon'
  //                 src='/images/edit_pencil.svg'
  //                 alt='Edit'
  //                 data-key='name'
  //                 onClick={enableEditable}
  //               />
  //             </div>
  //         }
  //         <div className='details-topic-container'>
  //           <p><span className='card-topic'>Birth:</span> {player.birth}</p>
  //           <img
  //             className='edit-icon'
  //             src='/images/edit_pencil.svg'
  //             alt='Edit'
  //             data-key='birth'
  //             onClick={enableEditable}
  //           />
  //         </div>
  //         <div className='details-topic-container'>
  //           <p><span className='card-topic'>Position:</span> {player.position}</p>
  //           <img
  //             className='edit-icon'
  //             src='/images/edit_pencil.svg'
  //             alt='Edit'
  //             data-key='position'
  //             onClick={enableEditable}
  //           />
  //         </div>
  //         <div className='details-topic-container'>
  //           <p><span className='card-topic'>Club:</span> {player.club}</p>
  //           <img
  //             className='edit-icon'
  //             src='/images/edit_pencil.svg'
  //             alt='Edit'
  //             data-key='club'
  //             onClick={enableEditable}
  //           />
  //         </div>
  //         <div className='details-topic-container'>
  //           <p><span className='card-topic'>Previous clubs:</span> {
  //             player.previousClubs ? player.previousClubs.map((club, index) => {
  //               if (index === player.previousClubs.length - 1) return club;
  //               return `${club}, `;
  //             }) : ''
  //           }</p>
  //           <img
  //             className='edit-icon'
  //             src='/images/edit_pencil.svg'
  //             alt='Edit'
  //             data-key='previousClubs'
  //             onClick={enableEditable}
  //           />
  //         </div>
  //       </div>
  //       </> : ''}
  //     </div>
  //     <Link to='/'>Back</Link>
  //   </main>
  // );
}
