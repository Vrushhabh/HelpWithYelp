import React from 'react';

function Weather(weather) {
  let isOutdoorSeating = '';

  if (weather.weather.outdoorSeating == 1) {
    isOutdoorSeating = '✅';
  } else {
    isOutdoorSeating = '❌';
  }

  return (
    <>
      <div className='Review-box'>
        <h2>{weather.weather.postal}</h2>
        <h4>
          Outdoor Seating ={'>'} {isOutdoorSeating}
        </h4>
        <h5>
          Based on the provided area code, we have found that outdoor seating is
          generally most available in this area during the month of{' '}
          <u>{weather.weather.highestTempMonth}</u>.
        </h5>
        <h5>
          <i>
            This prediction is based on historical temperature and precipitation
            data provided through the weather API.
          </i>
        </h5>
      </div>
    </>
  );
}

export default Weather;
