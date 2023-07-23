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
  const [country, setCountry] = useState(null);

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
      .then((country) =>
        setCountry(
          <div>
            <h2>{country.name.common}</h2>
            <p>
              capital {country.capital} <br /> area {country.area}{" "}
            </p>
            <h3>languages</h3>
            <ul>
              {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img
              src={country.flags.png}
              alt={"image of " + country + "'s flag"}
            />
          </div>
        )
      );
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
      <div>{country}</div>
    </div>
  );
}

export default App;

