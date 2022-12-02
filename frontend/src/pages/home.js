import React from 'react';
import logo from '../logo.png';
import '../App.css';
import Attributes from '../components/attributes';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='Header-links'>
          <Link to='/reviews'>Reviews</Link>
          <Link to='/seating'>Outdoor Seating</Link>
        </div>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Help with Yelp</h1>
        <Attributes />
        <Footer />
        <h5>
          <i>
            Want to see additional insights on the data we used? =&gt;{' '}
            <Link to='/insights'>Data Insights</Link>
          </i>
        </h5>
      </header>
    </div>
  );
}

export default Home;
