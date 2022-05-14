import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './PlayerCard.css';

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
  // return (
  //   <div className='card-container'>
  //     <img src={props.picture} alt={`${props.firstName} ${props.lastName} photo`} />
  //     <div className='card-info'>
  //       <p>{props.firstName} {props.lastName}</p>
  //       <p>Birth: {props.birth}</p>
  //       <p>Position: {props.position}</p>
  //       <p>Club: {props.club}</p>
  //       <p>Previous Clubs: {props.previousClubs.map((club, index) => {
  //         if (index === props.previousClubs.length - 1) return club;
  //         return `${club}, `;
  //       })}</p>
  //     </div>
  //     <Link to='/details'>Details</Link>
  //   </div>
  // );
}
