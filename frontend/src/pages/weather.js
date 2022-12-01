import React from 'react';
import logo from '../logo.png';
import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Temperature from '../components/temperature';

function Weather() {
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
        <h2>Weather</h2>
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
      </header>
      <Temperature />
    </div>
  );
}

export default Weather;
