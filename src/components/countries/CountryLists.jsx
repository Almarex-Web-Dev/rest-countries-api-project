import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Inputs from '../inputs/Inputs'

const COUNTRY_URL = 'https://restcountries.com/v3.1/all'

const CountryLists = () => {
  const [countryList, setCountry] = useState([])
  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${COUNTRY_URL}`)
      const Alldata = await response.data
      setCountry(Alldata)
    } catch (error) {
      console.log(error)
    }
  }

  const listCountries = countryList.slice(0, 16).map((country, index) => {
    return (
      <Link key={index} to={`/country/${country.name.common}`}>
        <article className="card">
          <img src={country.flags.png} alt="flags" />
          <div className="card__content">
            <h1>{country.name.common}</h1>
            <p>
              <b>Population: </b> {country.population}
            </p>
            <p>
              <b>Region: </b>
              {country.region}
            </p>
            <p>
              <b>Capital: </b>
              {country.capital}
            </p>
          </div>
        </article>
      </Link>
    )
  })
  useEffect(() => {
    fetchCountries()
  }, [])

  return (
    <>
      <div className="restcountries__wrapper">
        <Inputs setCountry={setCountry} countryRegion={countryList} />
        <div className="card__wrapper">{listCountries}</div>
      </div>
    </>
  )
}

export default CountryLists
