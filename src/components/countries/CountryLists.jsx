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

  const listCountries = countryList.slice(0, 8).map((country, index) => {
    return (
      <Link to={`/country/${country.name.common}`}>
        <article className="card" key={index}>
          <img src={country.flags.png} alt="flags" />
          <div className="card__content">
            <h3>{country.name.common}</h3>
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
