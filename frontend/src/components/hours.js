import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function Hours() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [day, setDay] = useState('');
  const [businessId, setBusinessId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await axios.get(
      `http://127.0.0.1:5000/change-hours/${businessId}/${day}/${startTime}/${endTime}`
    );

    setStartTime('');
    setEndTime('');
    setDay('');
    setBusinessId('');

    console.log(result);
  };

  return (
    <div className='Update-hours-box'>
      <h5>Incorrect business hours? Update them here:</h5>
      <form onSubmit={handleSubmit}>
        <input
          className='Footer-input'
          type='text'
          name='start-time'
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
          placeholder='Start time'
        />
        <br />
        <input
          className='Footer-input'
          type='text'
          name='end-time'
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
          placeholder='End time'
        />
        <br />
        <input
          className='Footer-input'
          type='text'
          name='day'
          value={day}
          onChange={(event) => setDay(event.target.value)}
          placeholder='Day of the week'
        />
        <br />
        <input
          className='Footer-input'
          type='text'
          name='business-id'
          value={businessId}
          onChange={(event) => setBusinessId(event.target.value)}
          placeholder='Business ID'
        />
        <br />
        <input className='Footer-button' type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default Hours;
