import React from 'react';
import logo from '../logo.png';
import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Weather from '../components/weather';

function Seating() {
  const [zipCode, setZipCode] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='Header-links'>
          <Link to='/'>Home</Link>
          <Link to='/reviews'>Reviews</Link>
        </div>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Help with Yelp</h1>
        <form onSubmit={handleSubmit}>
          <input
            className='Footer-input'
            type='text'
            name='zip-code'
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
            placeholder='Search by zip code'
          />
          <input className='Footer-button' type='submit' value='Submit' />
        </form>
        <h5>Weather information for the selected area code:</h5>
        <Weather />
      </header>
    </div>
  );
}

export default Seating;
