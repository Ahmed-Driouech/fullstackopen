import axios from 'axios';
import { useEffect, useState } from 'react';

const CountryPage = ({country}) =>{
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_WEATHER_KEY
    const lat = country.capitalInfo.latlng[0]
    const lng = country.capitalInfo.latlng[1]
    
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
        .then(response => setWeather(response.data))
        .catch(error => console.error('Error fetching weather:', error));
        },[])

       
        return(
            <>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>

                <h2>languages:</h2>
                <ul>
                    {Object.values(country.languages).map((language,index) => (
                        <li key={index}>{language}</li>
                    ))}
                </ul>
                <img src={country.flags.png}/>
                {weather ? 
                (
                <div>
                    <p>temperature {weather.main.temp} Celcius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
                    <p>wind {weather.wind.speed} m/s</p>
                </div>
                )
                :
                (<p>Loading weather data...</p>)
                }
            </>
    )
}

export default CountryPage