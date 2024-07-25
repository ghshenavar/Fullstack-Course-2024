import { useState, useEffect } from "react";
import axios from "axios";


const Country = ({ country }) => {

  const [weather, setWeather] = useState({});

  const params = {
    appid: import.meta.env.VITE_SOME_KEY,
    q: country.capital[0],
    units: "metric",
  };

  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", { params })
      .then((response) => {
        console.log(response.data)
        setWeather(response.data);
      })
      .catch((error) => {
        setWeather({});
      });
  }, []);

  
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>
          capital {country.capital}
          <br />
          area {country.area}
        </p>
        <h3>languages:</h3>
        <ul>
          {Object.entries(country.languages).map(([languageCode, language]) => (
            <li key={languageCode}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.name.common} />

        {weather && weather.main && weather.weather && weather.wind && (
        <div>
          <h1>Weather in {country.capital}</h1>
          temperature: {weather.main.temp} Celsius
          <br />
          <img
            src={
              "http://openweathermap.org/img/wn/" +
              weather.weather[0].icon +
              "@2x.png"
            }
            alt={weather.weather[0].main}
          />
          <br />
          wind {weather.wind.speed} m/s
        </div>
      )}

      </div>
    );
  };

  export default Country;