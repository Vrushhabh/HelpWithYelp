import React from 'react';
import logo from '../logo.png';
import '../App.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Weather from '../components/weather';
import axios from 'axios';

function Seating() {
  const [zipCode, setZipCode] = useState([]);
  const [weather, setWeather] = useState({
    postal: 61801,
    outdoorSeating: 0,
    highestTempMonth: 'June',
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/call-stored`);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await axios.get(
      `http://127.0.0.1:5000/return-weather-data/${zipCode}`
    );

    setWeather(result.data[0]);
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
        <h5>Outdoor seating information for the selected area code:</h5>
        <Weather weather={weather} />
      </header>
    </div>
  );
}

export default Seating;
