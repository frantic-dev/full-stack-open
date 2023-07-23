import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "./components/Loader";

function App() {
  const [value, setValue] = useState("");
  const [searchedCountry, setSearchedCountry] = useState("");
  const [countries, setCountries] = useState(null);
  const [searchNumber, setSearchNumber] = useState([]);
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayCountry, setDisplayCountry] = useState(null);
  const api = import.meta.env.VITE_API_KEY;

  function handleChange(e) {
    setValue(e.target.value);
  }

  //get data and an array of all countries names

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setCountries(data.map((country) => country.name.common));
        setLoading(false);
      });
  }, []);

  //display the one country user searches or clicked show button for

  function showCountry(country) {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/name/" + country)
      .then((response) => response.data)
      .then((countryData) => {
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?q=${countryData.capital}&units=metric&appid=${api}`
          )
          .then((response) => response.data)
          .then((weather) => {
            console.log(weather)
            setDisplayCountry(
              <div>
                <h2>{countryData.name.common}</h2>
                <p>
                  capital {countryData.capital} <br /> area {countryData.area}{" "}
                </p>
                <h3>languages</h3>
                <ul>
                  {Object.values(countryData.languages).map((language) => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
                <img
                  src={countryData.flags.png}
                  alt={"image of " + countryData + "'s flag"}
                />
                <h2>weather in {country} </h2>
                <p>temperature {weather.main.temp} Celsius</p>
                <img src={" https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} alt="" />
              </div>
            );
          });
        // .then((weather) => setCountry(country + (
        //   <div>

        //   </div>
        // )));
      });
  }

  //get number of countries that match the search query

  useEffect(() => {
    if (countries) {
      const numberCountries = countries.filter((country) =>
        country.toLowerCase().match(searchedCountry)
      );
      setSearchNumber(numberCountries);
    }
  }, [searchedCountry]);

  //the results to display after search

  useEffect(() => {
    if (searchNumber.length > 10)
      setResults("Too many matches, specify another filter");
    else if (searchNumber.length < 10 && searchNumber.length !== 1)
      setResults(
        searchNumber.map((country) => (
          <div key={country}>
            {country}
            <button onClick={() => showCountry(country)}>show</button>
          </div>
        ))
      );
    else {
      const country = searchNumber[0];
      showCountry(country);
      setResults(null);
    }
  }, [searchNumber]);

  function handleSearch(e) {
    e.preventDefault();
    setSearchedCountry(value);
    if (!countries) setLoading(true);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="countries">find countries</label>
        <input type="search" value={value} onChange={handleChange} />
      </form>
      <div>number of match {searchNumber.length}</div>
      {loading ? <Loader /> : null}
      <div>{results}</div>
      <div>{displayCountry}</div>
    </div>
  );
}

export default App;

