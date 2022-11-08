import React from 'react';

function Footer() {
  return (
    <div className='Attributes-container'>
      <div className='Attributes-boxes'>
        <p>
          <b>Add your business to Help with Yelp</b>
        </p>
        <input
          className='Footer-input'
          type='text'
          name='business-name'
          placeholder='Business Name'
        />
        <input
          className='Footer-input'
          type='text'
          name='business-category'
          placeholder='Business Category'
        />
        <input
          className='Footer-input'
          type='text'
          name='business-city'
          placeholder='City'
        />
        <input
          className='Footer-input'
          type='text'
          name='business-parking-type'
          placeholder='Parking Type'
        />
        <p>
          <input className='Footer-button' type='submit' value='Submit' />
        </p>
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
        <form>
          <input
            className='Footer-input'
            type='text'
            name='review-id'
            placeholder='Review ID'
          />
          <input className='Footer-button' type='submit' value='Submit' />
        </form>
      </div>
    </div>
  );
}

export default Footer;
