import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {
const [country, setCountry] = useState(null)
const [allCountries, setAllCountries] = useState([])
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => setAllCountries(response.data))
    console.log(allCountries)
  }, [])

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
    console.log(country)
  }
  return (
    <>
    <div>
      find countries <input value={country} onChange={handleCountryChange}/>
    </div>
    <ul>
      {allCountries.map(country => <li key={country.name.common}>{country.name.common}</li>)}
    </ul>
    </>
  )
}

export default App
