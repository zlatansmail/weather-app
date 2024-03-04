import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Autocomplete, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';


function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);


  //case for autocomplete
  const handleChange = (event, value) => {
    setCity(value);
  }

  const fetchWeatherData = async () => {
    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=16d81fadf1b4ab5a5b753818f58f1793&units=metric`);
      console.log(result);
      if (result.status === 200) {
        setWeatherData(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (city) {
      fetchWeatherData();
    } else {
      setWeatherData(null);
    }
    // ESlint disable next line
  }, [city]);


  const cities = ['Sarajevo', 'Mostar', 'New York', "Oslo", "Dar es Salaam", "Helsinki"]

  return (
    <div className="App">
      <div className='title-wrapper'>
        <h1>Weather App</h1>
        <ThermostatIcon />
      </div>
      <div className="App-header">
        <div className='input-wrapper'>
          <Autocomplete
            disablePortal
            id="city-search"
            options={cities}
            sx={{ width: 400 }}
            onChange={(event, value) => handleChange(event, value)}
            renderInput={(params) => <TextField {...params} label="City" />}
          />
        </div>
        <div className='weather-wrapper'>
          {weatherData ?
            (<>
              <h3 className='weather-title'>{weatherData?.name}</h3>
              <div className='temperature-wrapper'>
                <p>Temperature:</p>
                <p><b>{Math.round(weatherData?.main?.temp)}&deg;C</b></p>
              </div>
              <div className='temperature-wrapper'>
                <p>Feels Like:</p>
                <p><b>{Math.round(weatherData?.main?.feels_like)}&deg;C</b></p>
              </div>
              <div>
                <p className='weather'>{weatherData?.weather[0]?.main}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@4x.png`}
                  alt='weather icon'
                  width='100px'
                  height='100px'
                />
              </div>
              <div>
                <p>Humidity: <b>{weatherData?.main?.humidity}%</b></p>

              </div>
            </>
            ) : (
              <h4>No data available</h4>
            )}

        </div>
      </div>

    </div>
  )
};

export default App;
