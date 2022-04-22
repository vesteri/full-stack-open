import axios from 'axios';
import { useEffect, useState } from 'react';

const Weather = ({ country }) => {
  const kelvin = 273.15;
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;
  const lat = country.capitalInfo.latlng[0];
  const lng = country.capitalInfo.latlng[1];
  console.log(lat, lng);

  useEffect(() => {
    console.log('getting weather data');
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`
      )
      .then((response) => {
        console.log('promise fulfilled');
        setWeatherData(response.data);
      });
  }, [lat, lng, apiKey]);
  console.log(weatherData);

  if (!weatherData) {
    return <></>;
  }

  return (
    <div>
      <h3>Weather in {country.capital}:</h3>
      <p>Temperature: {(weatherData.main.temp - kelvin).toFixed(2)} °C</p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather.description}
        width={70}
      />
      <p>Wind: {weatherData.wind.speed} m/s</p>
    </div>
  );
};

const CountryInfo = ({ country }) => {
  console.log('showing country info');
  const languagesArray = Object.values(country.languages);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p style={{ fontWeight: 'bold' }}>Languages:</p>
      {languagesArray.map((language) => (
        <p key={language}>{`- ${language}`}</p>
      ))}
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width={100}
      />
      <Weather country={country} />
    </div>
  );
};

const Countries = ({ filter, data, setFilter }) => {
  const filteredCountries = data.filter((country) =>
    country.name.common.toUpperCase().includes(filter.toUpperCase())
  );
  console.log(`${filteredCountries.length} matches`);

  if (filteredCountries.length === 1) {
    return <CountryInfo country={filteredCountries[0]} />;
  }
  if (filteredCountries.length <= 10) {
    return (
      <div>
        <p>{`${filteredCountries.length} matches:`}</p>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setFilter(country.name.common)}>show</button>
          </div>
        ))}
      </div>
    );
  }
  return <p>{`${filteredCountries.length} matches. Set a filter above.`}</p>;
};

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('getting country data');
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      console.log('promise fulfilled');
      setData(response.data);
    });
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Find countries:
      <input
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <Countries filter={filter} data={data} setFilter={setFilter} />
    </div>
  );
};

export default App;
