import { useState, useEffect } from "react";
import axios from 'axios'
import Countries from './components/Countries'

const Input = ({text, value, handleChange}) => (
  <div>
    {text} <input value={value} onChange={handleChange} />
  </div>
)

function App() {

  const [filter, setFilter] = useState("");
  const[country, setCountry] = useState('')
  const[result, setResult] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setResult(response.data)
      })
  }, [])

  useEffect(() => {
    if (!filter) {
      return setCountry([]);
    }

    setCountry(
      result.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <Input text='find countries' value={filter} handleChange={handleFilterChange} />

      <Countries countries={country} setCountries={setCountry} />
    </>
  )
}

export default App
