import React from 'react';
import logo from '../logo.png';
import '../App.css';
import Review from '../components/review';

function Reviews() {
  return (
    <div className='App'>
      <header className='App-header'>
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
        <Review />
      </header>
    </div>
  );
}

export default Reviews;
