import React, { useState, useEffect } from 'react';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import FavoriteCities from './FavoriteCities';
import axios from 'axios';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('metric');

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: city,
          units: unit,
          appid: 'bc9960c34526b7b12d4fb0bda55e3a09'
        }
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  useEffect(() => {
    const loadFavorites = async () => {
      const response = await axios.get('http://localhost:5000/favorites');
      setFavorites(response.data);
    };
    loadFavorites();
  }, []);

  const addFavorite = async (city) => {
    const newFavorite = { id: Date.now(), city };
    await axios.post('http://localhost:5000/favorites', newFavorite);
    setFavorites([...favorites, newFavorite]);
  };

  // const removeFavorite = async (id) => {
  //   await axios.delete(`http://localhost:5000/favorites/${id}`);
  //   setFavorites(favorites.filter(fav => fav.id !== id));
  // };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${id}`);
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (error) {
      console.error('Error removing favorite city', error);
    }
  };
  

  return (
    <div className="weather-dashboard">
      <Search fetchWeather={fetchWeather} />
      <WeatherDisplay weatherData={weatherData} unit={unit} />
      <FavoriteCities 
        favorites={favorites} 
        fetchWeather={fetchWeather} 
        addFavorite={addFavorite} 
        removeFavorite={removeFavorite}
      />
      <button onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
};

export default WeatherDashboard;
