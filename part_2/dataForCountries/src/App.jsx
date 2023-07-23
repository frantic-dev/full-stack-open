import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "./components/Loader";

function App() {
  const [value, setValue] = useState("");
  const [searchedCountry, setSearchedCountry] = useState("");
  const [countriesData, setCountriesData] = useState(null);
  const [countries, setCountries] = useState(null);
  const [searchNumber, setSearchNumber] = useState([]);
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountriesData(response.data);
        return response.data;
      })
      .then((data) => {
        setCountries(data.map((country) => country.name.common));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (countries) {
      const numberCountries = countries.filter((country) =>
        country.toLowerCase().match(searchedCountry)
      );
      setSearchNumber(numberCountries);
    }
  }, [searchedCountry]);

  useEffect(() => {
    if (searchNumber.length > 10)
      setResults("Too many matches, specify another filter");
    else if (searchNumber.length < 10 && searchNumber.length !== 1)
      setResults(
        searchNumber.map((country) => <div key={country}>{country}</div>)
      );
    else {
      const country = searchNumber[0];
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/name/" + country)
        .then((response) => response.data)
        .then((country) =>
          setResults(
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
    </div>
  );
}

export default App;

