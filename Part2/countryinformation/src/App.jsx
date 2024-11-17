import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './Components/Filter'
import Countries from './Components/Countries';


function App() {
const [country, setCountry] = useState('')
const [countryFilter, setCountryFilter] = useState([])
const [allCountries, setAllCountries] = useState([])
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => setAllCountries(response.data))
    console.log(allCountries)
  }, [])

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
    setCountryFilter(allCountries.filter(c => c.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    console.log(countryFilter)
    console.log(event.target.value)
  }
  return (
    <>
    <Filter value={country} onChange={handleCountryChange}/>
    <Countries countryList={countryFilter}/>
    </>
  )
}

export default App
