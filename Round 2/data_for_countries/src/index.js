import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY

const Search = ({value, onChange}) => {
    return(
      <div>
        <form>
          <div>
            Find countries: <input value = {value} onChange = {onChange}/>
          </div>
        </form>
      </div>
    )
}

const Weather = ({country}) => {
  const [ weather, setWeather] = useState({})
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}&units=m`)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [country])

  if(!weather){
    return(
      <div>Not found...</div>
    )
  }
  return(
    <div>
      temperature: {weather.temperature}<br/> 
      <img 
        src= {weather.weather_icons}
        alt = "" 
        style={{ width: '40px', height: 'auto'  }}
      /> <br/>
      wind: {weather.wind_speed} direction {weather.wind_dir}
    </div>
  )
} 

const SingleCountry = ({country}) =>{
  return(
    <div>
    <h1>{country.name}</h1>
    Capital {country.capital} <br/>
    Population {country.population}
    <h2>langueages</h2>
    <ul>
      {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img 
      src={country.flag}
      alt="The countries flag"
      style={{ width: '200px', height: 'auto'  }}
    />
    <Weather country = {country}/>
  </div>
  )
}

const Leq10Countries = ({countries, handleClick}) =>{
  return(
    <div>
      {countries.map(country =>
         <p key={country.alpha2Code}>
            {country.name}
            <button onClick = {() => handleClick(country.name)}>Show</button>
         </p>)}
    </div>
  )
}

const CountryInformation = ({countries, handleClick}) => {
  if(countries.length === 1){
    const country = countries[0] 
    return(
      <SingleCountry country = {country}/>
    )
  }

  if(countries.length < 10){
    return(
      <Leq10Countries countries={countries} handleClick = {handleClick}/>
    )
  }

  return(
    <div>
    Too many matches specify another filter
    </div>
  )
}

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ countries, setCountries] = useState([])

  useEffect(()=> {
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response =>  {
          setCountries(response.data)
        })
  }, [])



  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  const showCountry = (country)=> {
      setSearch(country)
  }

  const filteredCountries = !search ? countries : countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

  return(
    <div>
      <Search value={search} onChange={handleSearchChange}/>
      <CountryInformation countries={filteredCountries} handleClick = {showCountry}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))