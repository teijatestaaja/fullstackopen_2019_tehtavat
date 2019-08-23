import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Osa 2 Maiden tiedot -tehtävät
// 2.12: Tee sovellus, jonka avulla voit tarkastella eri maiden tietoja
// 2.13: Paranna maasovellusta siten, että kun sivulla näkyy useiden maiden nimiä, tulee maan nimen viereen nappi, 
// jota klikkaamalla pääsee suoraan maan näkymään.
// 2.14: Lisää yksittäisen maan näkymään pääkaupungin säätiedotus.
// Kun ehdon täyttäviä maita on enää yksi, näytetään maan perustiedot, lippu, puhutut kielet ja pääkaupungin sää.

const CountryInfo = ( {country} ) => {
  const [ weather, setWeather ] = useState([])
  const [ iconUrl, setIconUrl ] = useState([])
  useEffect(() => {     
    axios
      .get(`http://api.apixu.com/v1/current.json?key=a99990898eac4ce5b54163101193105&q=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
        setIconUrl(response.data.current.condition.icon)
    })
  }, [country.capital])
 
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>  
      <h3>Languages</h3>
      <ul>{country.languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>  
      <p><img src={country.flag} alt="country flag" height="150" width="200"/></p>
      <h3>Weather in {country.capital}</h3>
      <p>
        <b>Temperature:</b> {weather.temp_c} Celsius<br/>
        <img src={iconUrl} alt="sää"/><br/>
        <b>Wind:</b> {weather.wind_kph} kph direction {weather.wind_dir}
      </p>
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filteredCountry, setFilteredCountry ] = useState("")

  useEffect(() => {     
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
    })
  }, [])

  const filterCountry = (event) => {
    setFilteredCountry(event.target.value)
  }

  const printResults = () => {
    var filteredCountries = filteredCountry === '' ? countries : countries.filter(
      (country) => {
        if(country.name.toLowerCase().includes(filteredCountry.toLowerCase())) return country.name
        else return ""
      }
    )
    // Jos hakuehtoa ei ole annettu
    if(filteredCountry === ""){
      return "Please enter a country name"
    }
    // jos maita 10 tai yli
    if(filteredCountries.length >= 10){
      return "Too many matches, please specify another country filter!" 
    }else{
      if(filteredCountries.length === 1){
        // Palautetaan yhden maan tiedot
        return (
          filteredCountries.map( country => <CountryInfo key={country.name} country={country}/>)
        )
      }
      if(filteredCountries.length === 0){
        return "No results!"
      }
      else{
        return filteredCountries.map( country => <div key={country.name} id={country.name}>{country.name} <button onClick={() => setFilteredCountry((country.name))}>Show</button></div>)
      }
    }
  }

  return (
    <div>
      <h2>Country Finder</h2>
      <form>
        <div>
          Find countries: <input value={filteredCountry} onChange={filterCountry}/>
        </div>
      </form>
         <div>{printResults()}</div>
    </div>
  )        

}

export default App
