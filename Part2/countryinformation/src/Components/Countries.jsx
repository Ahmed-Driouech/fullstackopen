import { useState } from "react";
import CountryPage from "./CountryPage";
const Countries = ({countryList}) => {
    const [showCountry, setShowCountry] = useState(null)
   
    const handleShowCountry = (c) => {
        setShowCountry(c)
    }

    if(showCountry){
        return <CountryPage country={showCountry}/>
    }
    
    if (countryList.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    } else if (countryList.length <= 10 && countryList.length > 1) {
        return (
        <>
            {countryList.map((country, index) => (
                <div key={index}>
                    <p>{country.name.common}</p>
                    <button onClick={() => handleShowCountry(country)}>show</button>
                </div>
            ))}
        </>
        );
    } else if (countryList.length === 1) {
        return <CountryPage country={countryList[0]}/>;
    }
   
}

export default Countries