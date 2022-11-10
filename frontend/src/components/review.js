import React from 'react';

function Review() {
  return (
    <>
      <div className='Review-box'>
        <h4>Santa Barbara Shellfish Company</h4>
        <h4>⭐⭐⭐⭐⭐</h4>
        <p>
          Location + Crabs = 5 stars. This is better than most places in
          California when it comes to crab
        </p>
        <p className='Text-ids'>
          <i>Business ID: SZU9c8V2GuREDN5KgyHFJw</i>
        </p>
        <p className='Text-ids'>
          <i>Review ID: 5Ih86LfoYz3YBNRAY3UXg</i>
        </p>
      </div>
      <div className='Hours-box'>
        <h5>Hours</h5>
        <p className='Text-hours'>
          <b>Monday</b>: 7am - 10pm
        </p>
        <p className='Text-hours'>
          <b>Tuesday</b>: 7am - 10pm
        </p>
        <p className='Text-hours'>
          <b>Wednesday</b>: 7am - 10pm
        </p>
        <p className='Text-hours'>
          <b>Thursday</b>: 7am - 10pm
        </p>
        <p className='Text-hours'>
          <b>Friday</b>: 7am - 10pm
        </p>
        <p className='Text-hours'>
          <b>Saturday</b>: 7am - 10pm
        </p>
        <p className='Text-hours'>
          <b>Sunday</b>: 7am - 10pm
        </p>
      </div>
    </>
  );
}

export default Review;
