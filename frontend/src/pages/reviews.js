import React from 'react';
import logo from '../logo.png';
import '../App.css';
import { useState } from 'react';
import Review from '../components/review';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ReviewCounter } from '../parsing';
import Hours from '../components/hours';

function Reviews() {
  const [zipCode, setZipCode] = useState([]);
  const [reviews, setReviews] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await axios.get(
      `http://127.0.0.1:5000/reviews-from-zip/${zipCode}`
    );

    const r = new ReviewCounter(result);
    const topReviews = r.get_reviews(0, 5);
    setReviews(topReviews);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='Header-links'>
          <Link to='/'>Home</Link>
          <Link to='/insights'>Data Insights</Link>
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
        <h5>Random reviews for the selected area code:</h5>
        <div className='Review-container'>
          {reviews.map((review) => (
            <Review key={review} review={review} />
          ))}
        </div>
        <Hours />
      </header>
    </div>
  );
}

export default Reviews;
