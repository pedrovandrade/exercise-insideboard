import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  writeFirstName,
  writeLastName,
  writeCurrentClub,
  writePreviousClubs,
  writePosition,
  writeBirthDate,
} from 'app/features/editPlayerSlice';
import axios from 'axios';
import style from './EditableAttribute.css';

export default function EditableAttribute(props) {
  /** **** Redux state variables **** */
  const player = useSelector((state) => state.edit.player);
  const apiUrl = useSelector((state) => state.network.apiUrl);

  const dispatch = useDispatch();

  const inputEl = useRef(null);
  const [editable, setEditable] = useState(false);

  // Event handler for the form input fields
  function handleEditableChange(event) {
    switch (event.target.dataset.key) {
      case 'firstName':
        dispatch(writeFirstName(event.target.value));
        break;
      case 'lastName':
        dispatch(writeLastName(event.target.value));
        break;
      case 'birth':
        dispatch(writeBirthDate(event.target.value));
        break;
      case 'position':
        dispatch(writePosition(event.target.value));
        break;
      case 'club':
        dispatch(writeCurrentClub(event.target.value));
        break;
      case 'previousClubs':
        dispatch(writePreviousClubs({
          value: event.target.value,
          index: props.index,
        }));
        break;
      default:
        break;
    }
  }

  function enableEditable() {
    setEditable(true);
  }

  function disableEditable(event) {
    console.log('event.target.value:', event.target.value);
    const jsonPayload = {
      uuid: player.uuid,
      attribute: props.attribute,
      value: event.target.value,
      index: props.attribute === 'previousClubs' ? props.index : null,
    };
    axios.post(`${apiUrl}/api/update`, jsonPayload).then((response) => {
      if (response.status === 200) {
        setEditable(false);
        return;
      }
      setEditable(false);
      return new Promise((resolve, reject) => {
        reject(new Error('Error on data update!'));
      });
    }).then(() => {
      // TODO: create a better refresh method
      window.location.reload(false);
    }).catch((err) => {
      console.error(err);
    });
  }

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, [editable])

  useEffect(() => {
    switch (props.attribute) {
      case 'firstName':
        dispatch(writeFirstName(props.content));
        break;
      case 'lastName':
        dispatch(writeLastName(props.content));
        break;
      case 'birth':
        dispatch(writeBirthDate(props.content));
        break;
      case 'position':
        dispatch(writePosition(props.content));
        break;
      case 'club':
        dispatch(writeCurrentClub(props.content));
        break;
      case 'previousClubs':
        dispatch(writePreviousClubs({
          value: props.content,
          index: props.index,
        }));
        break;
      default:
        break;
    }
  }, [props.content]);

  return (<>
    { editable
      ? <input
        type='text'
        value={
          props.index || props.index === 0
            ? player[props.attribute][props.index]
            : player[props.attribute]
          }
          data-key={props.attribute}
          onBlur={disableEditable}
          onChange={handleEditableChange}
          ref={inputEl}
        />
      : <span>
          {props.content}
          <img
            className='edit-icon'
            src='/images/edit_pencil.svg'
            alt='Edit'
            data-key={props.attribute}
            onClick={enableEditable}
          />
        </span>
    }</>
  );
}
