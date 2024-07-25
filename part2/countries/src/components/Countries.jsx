const Country = ({ country }) => {
  
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
      </div>
    );
  };

const Countries = ({ countries, setCountries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length === 0) {
    return;
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  return (
    <div>
      {countries.map((country, idx) => (
        <div key={idx}>
          <li>{country.name.common}{" "}
          <button onClick={() => setCountries([country])}>show</button>
          </li>
        </div>
      ))}
    </div>
  );
};

export default Countries;