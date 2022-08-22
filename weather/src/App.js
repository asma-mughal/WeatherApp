import './App.css';
import { Search } from './component/Search/search';
import {CurrentWeather} from './component/CurrentWeather/currentWeather';
import { FORECAST_API_KEY, WEATHER_API, WEATHER_API_KEY } from './api';
import React, { useState } from 'react';
import { Forecast } from './component/forecast/forecast';
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather , setForecastWeather] = useState(null);
  const handleOnSearchChange = (data) =>{
   const [lat, lon] = data.value.split(" ")
   const currentWeatherFetch =  fetch(`${WEATHER_API}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
   const forecastFetch = fetch(
    `${FORECAST_API_KEY}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  );
   Promise.all([currentWeatherFetch, forecastFetch])
   .then(async (response) => {
     const weatherResponse = await response[0].json();
     const forecastResponse = await response[1].json();
     setCurrentWeather({city:data.label, ...weatherResponse} );
     setForecastWeather({city:data.label,...forecastResponse})
     
   })
   .catch(error=> console.log(error));
  }
  console.log( forecastWeather)
  return (
     <div className="container">
  <Search onSearchChange={handleOnSearchChange} />
  {currentWeather && <CurrentWeather data={currentWeather} /> }
  { forecastWeather && <Forecast data={forecastWeather} />}
    </div>
  );
}

export default App;
