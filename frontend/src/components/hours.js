import React from 'react';

function Hours() {
  return (
    <div className='Update-hours-box'>
      <h5>Incorrect business hours? Update them here:</h5>
      <form>
        <select name='day' id='day'>
          <option value='monday'>Monday</option>
          <option value='tuesday'>Tuesday</option>
          <option value='wednesday'>Wednesday</option>
          <option value='thursday'>Thursday</option>
          <option value='friday'>Friday</option>
          <option value='saturday'>Saturday</option>
          <option value='sunday'>Sunday</option>
        </select>
        <br />
        <input
          className='Footer-input'
          type='text'
          name='zip-code'
          placeholder='Enter the correct hours'
        />
        <br />
        <input
          className='Footer-input'
          type='text'
          name='zidp-code'
          placeholder='Business ID'
        />
        <br />
        <input className='Footer-button' type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default Hours;
