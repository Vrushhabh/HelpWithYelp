import React from 'react';

function Review(review) {
  let starsCount = Math.round(review.review[0]);
  let stars = '';

  while (starsCount > 0) {
    stars += '⭐';
    starsCount -= 1;
  }

  return (
    <>
      <div className='Review-box'>
        <h4>{review.review[1].name}</h4>
        <h4>{stars}</h4>
        <p>{review.review[1].text}</p>
        <p className='Text-ids'>
          <i>Business ID: {review.review[1].business_id}</i>
        </p>
        <p className='Text-ids'>
          <i>Review ID: {review.review[1].review_id}</i>
        </p>
      </div>
      <div className='Hours-box'>
        <h5>Hours</h5>
        <p className='Text-hours'>
          <b>Monday</b>: {review.review[1].monday}
        </p>
        <p className='Text-hours'>
          <b>Tuesday</b>: {review.review[1].tuesday}
        </p>
        <p className='Text-hours'>
          <b>Wednesday</b>: {review.review[1].wednesday}
        </p>
        <p className='Text-hours'>
          <b>Thursday</b>: {review.review[1].thursday}
        </p>
        <p className='Text-hours'>
          <b>Friday</b>: {review.review[1].friday}
        </p>
        <p className='Text-hours'>
          <b>Saturday</b>: {review.review[1].saturday}
        </p>
        <p className='Text-hours'>
          <b>Sunday</b>: {review.review[1].sunday}
        </p>
      </div>
    </>
  );
}

export default Review;
