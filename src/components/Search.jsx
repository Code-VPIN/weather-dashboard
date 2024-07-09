import React, { useState } from 'react';

const Search = ({ fetchWeather }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    fetchWeather(city);
  };

  return (
    <div className="search">
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
