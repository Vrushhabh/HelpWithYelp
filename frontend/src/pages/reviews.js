import React from 'react';
import logo from '../logo.png';
import '../App.css';
import Review from '../components/review';
import { Link } from 'react-router-dom';

function Reviews() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='Header-links'>
          <Link to='/'>Home</Link>
          <Link to='/insights'>Data Insights</Link>
        </div>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Help with Yelp</h1>
        <form>
          <input
            className='Footer-input'
            type='text'
            name='zip-code'
            placeholder='Search by zip code'
          />
          <input className='Footer-button' type='submit' value='Submit' />
        </form>
        <h5>Random reviews for the selected area code:</h5>
        <div className='Review-container'>
          <Review />
          <Review />
          <Review />
        </div>
      </header>
    </div>
  );
}

export default Reviews;
