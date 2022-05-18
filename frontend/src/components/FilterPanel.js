import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  writeName,
  writeCurrentClub,
  writePreviousClub,
  writePosition,
  writeBirthDate
} from '../app/features/filterSlice';
import style from './FilterPanel.css';

/**
 * Home page's filter panel element to selectively display the players' cards
 * according to the information given on the input fields.
 * @constructor
 */
export default function FilterPanel() {
  /** **** Redux state variables **** */
  const name = useSelector((state) => state.filter.name);
  const currentClub = useSelector((state) => state.filter.currentClub);
  const previousClubs = useSelector((state) => state.filter.previousClubs);
  const position = useSelector((state) => state.filter.position);
  const birthDate = useSelector((state) => state.filter.birthDate);

  const dispatch = useDispatch();

  // Event handlers for the form input fields
  function handleNameTyping(event) {
    dispatch(writeName(event.target.value));
  }

  function handleCurrentClubTyping(event) {
    dispatch(writeCurrentClub(event.target.value));
  }

  function handlePreviousClubsTyping(event) {
    dispatch(writePreviousClub(event.target.value));
  }

  function handlePositionSelection(event) {
    dispatch(writePosition(event.target.value));
  }

  function handleBirthDateSelection(event) {
    dispatch(writeBirthDate(event.target.value));
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
          <select
            value={position}
            onChange={handlePositionSelection}
          >
            <option value=''>All</option>
            <option value='forward'>Forward</option>
            <option value='midfielder'>Midfielder</option>
            <option value='defender'>Defender</option>
            <option value='goalkeeper'>Goalkeeper</option>
          </select>
        </label>
        <label>Birth date:
          <input
            type='text'
            className='text-input'
            placeholder='Ex. 14/01/1994'
            value={birthDate}
            onChange={handleBirthDateSelection}
          />
        </label>
      </fieldset>
    </form>
  );
}
