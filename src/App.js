// App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "cf6cae627141447e9e6113102230410";
  const API_URL = "https://api.weatherapi.com/v1/current.json";

  const fetchWeatherData = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}`);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="App">
      <div className="weather-container">
        <h1>Weather App</h1>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="city-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        {loading && <p className="loading">Loading data...</p>}

        {weatherData && (
          <div className="weather-cards">
            <div className="weather-card">
              <h3>Temperature</h3>
              <p>{weatherData.current.temp_c}°C</p>
            </div>
            <div className="weather-card">
              <h3>Humidity</h3>
              <p>{weatherData.current.humidity}%</p>
            </div>
            <div className="weather-card">
              <h3>Condition</h3>
              <p>{weatherData.current.condition.text}</p>
            </div>
            <div className="weather-card">
              <h3>Wind Speed</h3>
              <p>{weatherData.current.wind_kph} kph</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
