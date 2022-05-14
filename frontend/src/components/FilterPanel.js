import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import style from './FilterPanel.css';

export default function FilterPanel() {
  const [name, setName] = useState('');
  const [currentClub, setCurrentClub] = useState('');
  const [previousClubs, setPreviousClubs] = useState('');
  const [position, setPosition] = useState('');
  const [birthYear, setBirthYear] = useState('');

  function handleNameTyping(event) {
    setName(event.target.value);
  }

  function handleCurrentClubTyping(event) {
    setCurrentClub(event.target.value);
  }

  function handlePreviousClubsTyping(event) {
    setPreviousClubs(event.target.value);
  }

  function handlePositionSelection(event) {
    setPosition(event.target.value);
  }

  function handleBirthYearSelection(event) {
    setBirthYear(event.target.value);
  }

  return (
    <form>
      <fieldset className='filter-panel'>
        <legend>Filter by:</legend>
        <label>Name:
          <input
            type='text'
            className='text-input'
            placeholder='First or last name'
            value={name}
            onChange={handleNameTyping}
          />
        </label>
        <label>Current club:
          <input
            type='text'
            className='text-input'
            placeholder='Ex. Paris Saint-German'
            value={currentClub}
            onChange={handleCurrentClubTyping}
          />
        </label>
        <label>Previous club:
          <input
            type='text'
            className='text-input'
            placeholder='Ex. Real Madrid'
            value={previousClubs}
            onChange={handlePreviousClubsTyping}
          />
        </label>
        <label>Position:
          <select value={position} onChange={handlePositionSelection}>
            <option value='' selected>All</option>
            <option value='forward'>Forward</option>
            <option value='midfielder'>Midfielder</option>
            <option value='defender'>Defender</option>
            <option value='goalkeeper'>Goalkeeper</option>
          </select>
        </label>
        <label>Birth year:
          <input
            type='text'
            className='text-input'
            placeholder='Ex. 1994'
            value={birthYear}
            onChange={handleBirthYearSelection}
          />
        </label>
      </fieldset>
    </form>
  );
}
