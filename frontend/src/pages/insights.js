import React from 'react';
import logo from '../logo.png';
import '../App.css';
import { Link } from 'react-router-dom';
import insights_one from '../assets/insights_one.jpeg';
import insights_two from '../assets/insights_two.jpeg';
import insights_three from '../assets/insights_three.jpeg';
import insights_four from '../assets/insights_four.jpeg';
import insights_five from '../assets/insights_five.jpeg';

function Insights() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='Header-links'>
          <Link to='/'>Home</Link>
        </div>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Help with Yelp</h1>
        <h2>Data Insights</h2>
        <p className='Insights-text'>
          We received our data from kaggle.com where we got yelp data from many
          different areas around the US. When exploring where this data was
          actually coming from we found there were really only 10 main cities
          that our data was clustering around. This is important because we
          search by postal code in our advanced queries and we need to know
          which postal codes are most prevalent for testing purposes.
        </p>
        <img src={insights_one} alt='' width='40%' />
        <img src={insights_two} alt='' width='15%' />
        <p className='Insights-text'>
          To explore the data further we zoomed in on the Pennsylvania area as
          you can see this area has the most total businesses.
        </p>
        <img src={insights_five} alt='' width='40%' />
        <p className='Insights-text'>
          We ran a secondary zoomed in image of all the points and saw that most
          of the points were in philadelphia which makes sense and told us that
          most of the points would be densely clustered around cities.
        </p>
        <img src={insights_three} alt='' width='40%' />
        <p className='Insights-text'>
          On this last plot we made a nice zoomed in version where we can see
          businesses around the city and from this we can see that the yelp data
          focuses generally on densely clustered businesses in downtown areas
          and we can see that cities have most of the points from the freq
          query. This proves that querying by postal code is effective since for
          each city postal code we will get enough data points from our advanced
          queries.
        </p>
        <img src={insights_four} alt='' width='15%' />
      </header>
    </div>
  );
}

export default Insights;
