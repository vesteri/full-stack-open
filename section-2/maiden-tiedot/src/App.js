import axios from 'axios';
import { useEffect, useState } from 'react';

const CountryInfo = ({ country }) => {
  console.log('showing country info');
  const languagesArray = Object.values(country.languages);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p style={{ fontWeight: 'bold' }}>Languages:</p>
      {languagesArray.map((language) => (
        <p key={language}>{`- ${language}`}</p>
      ))}
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </div>
  );
};

const Countries = ({ filter, data }) => {
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
        {filteredCountries.map((country) => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
      </div>
    );
  }
  return <p>Too many matches. Set a filter above.</p>;
};

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('effect');
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
      <Countries filter={filter} data={data} />
    </div>
  );
};

export default App;
