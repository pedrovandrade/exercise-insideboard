import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setPlayers } from 'app/features/playerListSlice';
import {
  writeFirstName,
  writeLastName,
  writeCurrentClub,
  writePreviousClubs,
  writePosition,
  writeBirthDate,
  addPreviousClub,
  deletePreviousClub,
  setPictureSelected,
  resetData,
} from '../app/features/addPanelSlice';
import style from './FilterPanel.css';

/**
 * Home page's add panel element to send to the server the information of a new
 * player.
 * @constructor
 */
export default function AddPanel() {
  /** **** Redux state variables **** */
  const firstName = useSelector((state) => state.addPlayer.firstName);
  const lastName = useSelector((state) => state.addPlayer.lastName);
  const currentClub = useSelector((state) => state.addPlayer.currentClub);
  const previousClubs = useSelector((state) => state.addPlayer.previousClubs);
  const previousClubStr = useSelector((state) => state.addPlayer.previousClubStr);
  const position = useSelector((state) => state.addPlayer.position);
  const birthDate = useSelector((state) => state.addPlayer.birthDate);
  const pictureSelected = useSelector((state) => state.addPlayer.pictureSelected);
  const players = useSelector((state) => state.display.players);
  const apiUrl = useSelector((state) => state.network.apiUrl);

  const dispatch = useDispatch();

  // Local states (React state hooks)
  const [hiddenWarning, setHiddenWarning] = useState({
    firstName: true,
    lastName: true,
    currentClub: true,
    previousClubs: true,
    position: true,
    birthDate: true,
    pictureSelected: true,
  });
  const [formDisabled, setFormDisabled] = useState(false);
  const [pictureFile, setPictureFile] = useState(null);
  const [hasFileInput, setHasFileInput] = useState(true);

  // Event handlers for the form input fields
  function handleFirstNameTyping(event) {
    dispatch(writeFirstName(event.target.value));
  }

  function handleLastNameTyping(event) {
    dispatch(writeLastName(event.target.value));
  }

  function handleCurrentClubTyping(event) {
    dispatch(writeCurrentClub(event.target.value));
  }

  function handlePreviousClubsTyping(event) {
    dispatch(writePreviousClubs(event.target.value));
  }

  function handlePositionSelection(event) {
    dispatch(writePosition(event.target.value));
  }

  // function handleBirthDateSelection(event) {
  function handleBirthDateSelection(event) {
    dispatch(writeBirthDate(event.target.value.trim()));
  }

  /**
   * Add a typed previous club name to the new player's list when the user
   * presses the "Add club" button
   * @return None
   */
  function insertPreviousClubOnList() {
    // Eliminate white spaces at the beginning and end
    const trimmedStr = previousClubStr.trim();

    // If the string is empty or has only spaces, don't insert it
    if (trimmedStr.length === 0) return;

    dispatch(addPreviousClub(trimmedStr));
    dispatch(writePreviousClubs(''));
  }

  // When the user select a picture to send to the backend, update its state
  function handlePictureSelection(event) {
    setPictureFile(event.target.files[0]);
    dispatch(setPictureSelected(true));
  }

  /**
 * Generates a random UUID, either with the new crypto.randomUUID native method
 * or with a (less robust) Math.random solution
 */
  function generateUUID() {
    try {
      return crypto.randomUUID();
    } catch { // In case crypto.randomUUID is not found
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }

  /**
   * Send the selected picture to the backend via an asynchronous POST request
   * @param  {string} newFileName - The picture file new name for the backend
   * @return {Promise} axios request promise
   */
  function sendPicture(newFileName) {
    const formData = new FormData();
    formData.append('image', pictureFile, newFileName);
    return axios.post(`${apiUrl}/api/picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  /**
   * Before sending the data to the server, check every field to see if it's in
   * a correct manner
   * @return {boolean} Status to say if the data is ready to be sent
   */
  function sanityCheck() {
    let readyToSend = true;
    // Temporary status object to update the hiddenWarning state
    const hiddenWarningStatus = {
      firstName: true,
      lastName: true,
      currentClub: true,
      previousClubs: true,
      position: true,
      birthDate: true,
      pictureSelected: true,
    };

    if (!firstName.trim()) {
      hiddenWarningStatus.firstName = false;
      readyToSend = false;
    }

    if (!lastName.trim()) {
      hiddenWarningStatus.lastName = false;
      readyToSend = false;
    }

    if (!currentClub.trim()) {
      hiddenWarningStatus.currentClub = false;
      readyToSend = false;
    }

    if (previousClubs.length === 0) {
      hiddenWarningStatus.previousClubs = false;
      readyToSend = false;
    }

    if (!position) {
      hiddenWarningStatus.position = false;
      readyToSend = false;
    }

    if (!(/[0-3][0-9]\/[0-1][0-9]\/[0-9]{4}/.test(birthDate))) {
      hiddenWarningStatus.birthDate = false;
      readyToSend = false;
    }

    if (!pictureSelected) {
      hiddenWarningStatus.pictureSelected = false;
      readyToSend = false;
    }

    setHiddenWarning({ ...hiddenWarningStatus });

    return readyToSend;
  }

  /**
   * Validate the data to be sent to the server and, in case it's good, send it
   * @return None
   */
  function sendData() {
    const readyToSend = sanityCheck();

    if (readyToSend) {
      setFormDisabled(true);
      let newUuid = generateUUID();
      const uuidChecker = (item) => item.uuid === newUuid;
      let alreadyExists = !!players.find(uuidChecker);
      while (alreadyExists) {
        newUuid = generateUUID();
        alreadyExists = !!players.find(uuidChecker);
      }

      const extension = pictureFile.name.split('.').pop();
      const newFileName = `${newUuid}.${extension}`;

      // The new player's data object to be sent to the database
      const jsonPayload = {
        firstName,
        lastName,
        position,
        club: currentClub,
        birth: birthDate,
        previousClubs,
        picture: newFileName,
        uuid: newUuid,
      };
      axios.post(`${apiUrl}/api/data`, jsonPayload).then((response) => {
        if (response.status === 200) {
          return sendPicture(newFileName);
        }
        return new Promise((resolve, reject) => {
          reject(new Error('Error on data upload!'));
        });
      }).then((response) => {
        if (response.status === 200) {
          setHasFileInput(false);
          setPictureFile(null);
          dispatch(resetData());
          setFormDisabled(false);
          return axios.get(`${apiUrl}/api/data`, { responseType: 'json' });
        }
        return new Promise((resolve, reject) => {
          reject(new Error('Error on picture upload!'));
        });
      }).then((response) => {
        // If all the information upload works without problem, refresh the page
        dispatch(setPlayers(response.data));
        setHasFileInput(true);
      })
        .catch((err) => {
          setHasFileInput(true);
          console.error(err);
        });
    }
  }

  return (
    <form>
      <fieldset className='filter-panel'>
        <legend>Add new player</legend>
        <label>First name:
          <input
            type='text'
            className='text-input'
            placeholder='First name'
            value={firstName}
            onChange={handleFirstNameTyping}
            required
            disabled={formDisabled}
          />
        </label>
        <p className='input-error' hidden={hiddenWarning.firstName}>
          Please insert the player&apos;s first name
        </p>
        <label>Last name:
          <input
            type='text'
            className='text-input'
            placeholder='Last name'
            value={lastName}
            onChange={handleLastNameTyping}
            required
            disabled={formDisabled}
          />
        </label>
        <p className='input-error' hidden={hiddenWarning.lastName}>
          Please insert the player&apos;s last name
        </p>
        <label>Current club:
          <input
            type='text'
            className='text-input'
            placeholder='Current club'
            value={currentClub}
            onChange={handleCurrentClubTyping}
            required
            disabled={formDisabled}
          />
        </label>
        <p className='input-error' hidden={hiddenWarning.currentClub}>
          Please insert one club name
        </p>
        <label>Previous club:
          <input
            type='text'
            className='text-input'
            placeholder='Previous club'
            value={previousClubStr}
            onChange={handlePreviousClubsTyping}
            required
            disabled={formDisabled}
          />
          <button
            type='button'
            onClick={insertPreviousClubOnList}
            disabled={formDisabled}
          >
            Add club
          </button>
          <ul>
          {previousClubs.map((club, index) => {
            return (
              <li key={index}>
                {club + '  '}
                <button
                  type='button'
                  disabled={formDisabled}
                  onClick={() => dispatch(deletePreviousClub(index))}
                >
                  Delete
                </button>
              </li>);
          })}
          </ul>
        </label>
        <p className='input-error' hidden={hiddenWarning.previousClubs}>
          Please insert at least one club on the list
        </p>
        <label>Position:
          <select
            value={position}
            onChange={handlePositionSelection}
            disabled={formDisabled}
          >
            <option value='' disabled>Select a position</option>
            <option value='forward'>Forward</option>
            <option value='midfielder'>Midfielder</option>
            <option value='defender'>Defender</option>
            <option value='goalkeeper'>Goalkeeper</option>
          </select>
        </label>
        <p className='input-error' hidden={hiddenWarning.position}>
          Please select a position from the list
        </p>
        <label>Birth date:
          <input
            type='text'
            className='text-input'
            placeholder='dd/mm/yyyy'
            value={birthDate}
            onChange={handleBirthDateSelection}
            required
            disabled={formDisabled}
          />
        </label>
        <p className='input-error' hidden={hiddenWarning.birthDate}>
          Please enter a date on format DD/MM/YYYY
        </p>
        { hasFileInput ? (<><label>Photo (PNG or JPEG formats):
          <input
            type='file'
            accept='image/png, image/jpeg'
            multiple={false}
            onChange={handlePictureSelection}
            required
            disabled={formDisabled}
          />
        </label>
        <p className='input-error' hidden={hiddenWarning.pictureSelected}>
          Please upload a picture
        </p></>) : ''}
        <button
          type='button'
          onClick={sendData}
          disabled={formDisabled}
        >
          Send
        </button>
      </fieldset>
    </form>
  );
}
