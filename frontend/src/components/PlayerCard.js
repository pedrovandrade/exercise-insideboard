import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './PlayerCard.css';

/**
 * Player card component to display the picture and name of a given player on
 * home page, as well as the link to its details page.
 * @param       {object} props - Input properties object:
 * @param       {string} props.firstName - The player's first name.
 * @param       {string} props.lastName - The player's last name.
 * @param       {string} props.picture - The player's picture backend URL.
 * @param       {string} props.uuid - The player's given uuid.
 * @constructor
 */
export default function PlayerCard(props) {
  return (
    <div className='card-container'>
      <img src={props.picture} alt={`${props.firstName} ${props.lastName} photo`} />
      <div className='card-info'>
        <p>{props.firstName} {props.lastName}</p>
        <Link to={`/details/${props.uuid}`}>Details</Link>
      </div>
    </div>
  );
}
