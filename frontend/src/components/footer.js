import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function Footer() {
  const [reviewId, setReviewId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleAddBusiness = async (event) => {
    event.preventDefault();

    const res = await axios.get(
      `http://127.0.0.1:5000/add-business/${name}/${zipCode}/${state}/${category}`
    );

    setName('');
    setCategory('');
    setState('');
    setZipCode('');

    console.log(res);
  };

  const handleDeleteReview = async (event) => {
    event.preventDefault();

    await axios.get(
      `http://127.0.0.1:5000/delete-unhelpful-review/${reviewId}`
    );

    setReviewId('');
  };

  return (
    <div className='Attributes-container'>
      <div className='Attributes-boxes'>
        <p>
          <b>Add your business to Help with Yelp</b>
        </p>
        <form onSubmit={handleAddBusiness}>
          <input
            className='Footer-input'
            type='text'
            name='business-name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder='Business Name'
          />
          <input
            className='Footer-input'
            type='text'
            name='business-category'
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder='Business Category'
          />
          <input
            className='Footer-input'
            type='text'
            name='business-state'
            value={state}
            onChange={(event) => setState(event.target.value)}
            placeholder='State (ex. IL)'
          />
          <input
            className='Footer-input'
            type='text'
            name='business-postal-code'
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
            placeholder='Postal Code'
          />
          <p>
            <input className='Footer-button' type='submit' value='Submit' />
          </p>
        </form>
      </div>
      <div className='Attributes-boxes'>
        <p>
          <b>Report reviews violating Help with Yelp community standards</b>
        </p>
        <p>
          Help with Yelp aims to give business owners valuable insights into
          consumer behavior. Spam reviews (and other reviews violating our
          standards) hinder our ability to do this. We encourage business owners
          to report such reviews here.
        </p>
        <form onSubmit={handleDeleteReview}>
          <input
            className='Footer-input'
            type='text'
            name='review-id'
            value={reviewId}
            onChange={(event) => setReviewId(event.target.value)}
            placeholder='Review ID'
          />
          <input className='Footer-button' type='submit' value='Submit' />
        </form>
      </div>
    </div>
  );
}

export default Footer;
