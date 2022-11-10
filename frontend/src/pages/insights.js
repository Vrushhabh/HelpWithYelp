import React from 'react';
import logo from '../logo.png';
import '../App.css';
import { Link } from 'react-router-dom';

function Insights() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='Header-links'>
          <Link to='/'>Home</Link>
          <Link to='/reviews'>Reviews</Link>
        </div>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Help with Yelp</h1>
        <h2> This page is for the data insights</h2>
      </header>
    </div>
  );
}

export default Insights;
