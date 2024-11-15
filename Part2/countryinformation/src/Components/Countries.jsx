import CountryPage from "./CountryPage";
const Countries = ({countryList}) => {
             
    if (countryList.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    } else if (countryList.length <= 10 && countryList.length > 1) {
        return (
        <>
            {countryList.map((country, index) => (
            <p key={index}>{country.name.common}</p>
            ))}
        </>
        );
    } else if (countryList.length === 1) {
        return <CountryPage country={countryList[0]}/>;
    }
   
}

export default Countries