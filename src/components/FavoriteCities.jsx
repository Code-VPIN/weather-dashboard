import React from 'react';

const FavoriteCities = ({ favorites, fetchWeather, addFavorite, removeFavorite }) => {
  return (
    <div className="favorite-cities">
      <h2>Favorite Cities</h2>
      <ul>
        {favorites.map(fav => (
          <li key={fav.id}>
            <button onClick={() => fetchWeather(fav.city)}>{fav.city}</button>
            <button onClick={() => removeFavorite(fav.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addFavorite(prompt('Enter city name:'))}>Add Favorite</button>
    </div>
  );
};

export default FavoriteCities;
