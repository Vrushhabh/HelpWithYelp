import React from 'react';
import '../App.css';

function Attributes() {
  return (
    <>
      <form>
        <input
          className='Footer-input'
          type='text'
          name='zip-code'
          placeholder='Search by zip code'
        />
        <input className='Footer-button' type='submit' value='Submit' />
      </form>
      <h5>
        Common attributes of businesses which were successful in this category:
      </h5>
      <div className='Attributes-container'>
        <div className='Attributes-boxes'>Valet Parking</div>
        <div className='Attributes-boxes'>Casual Attire</div>
        <div className='Attributes-boxes'>Good for Desert</div>
        <div className='Attributes-boxes'>BYOB</div>
        <div className='Attributes-boxes'>Accepts Credit Cards</div>
        <div className='Attributes-boxes'>Trendy</div>
      </div>
    </>
  );
}

export default Attributes;
