const CountryPage = ({country}) =>{
    console.log("hi")
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
        </>
    )
}

export default CountryPage