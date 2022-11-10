import React from 'react';
import '../App.css';
import { useState } from 'react';
import axios from 'axios';
import { CategoryCounter } from '../parsing';

function Attributes() {
  const [zipCode, setZipCode] = useState([]);
  // State contains default categories for when the page is initially loaded.
  const [categories, setCategories] = useState([
    'Casual Attire',
    'Good for Desert',
    'BYOB',
    'Accepts Credit Cards',
    'Trendy',
    'Expensive Dining',
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await axios.get(
      `http://127.0.0.1:5000/categories-from-zip/${zipCode}`
    );

    const c = new CategoryCounter(result);
    const maxCategories = c.find_max_n_categories(6);
    setCategories([maxCategories].map((x) => x.map((a) => a[0])).flat(2));
  };

  return (
    <>
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
      <h5>
        Common attributes of businesses which were successful in this area:
      </h5>
      <div className='Attributes-container'>
        {categories.map((category) => (
          <div className='Attributes-boxes' key={category}>
            {category}
          </div>
        ))}
      </div>
    </>
  );
}

export default Attributes;
