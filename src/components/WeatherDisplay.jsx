import React from 'react';

const WeatherDisplay = ({ weatherData, unit }) => {
  if (!weatherData) return null;

  const { list, city } = weatherData;

  return (
    <div className="weather-display">
      <h2>Weather in {city.name}</h2>
      <div className="current-weather">
        <p>Current: {list[0].main.temp}° {unit === 'metric' ? 'C' : 'F'}</p>
        <p>Condition: {list[0].weather[0].description}</p>
      </div>
      <div className="forecast">
        {list.slice(1, 6).map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <p>Temp: {item.main.temp}°</p>
            <p>{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
