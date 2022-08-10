import React, { useState } from 'react'
import axios from 'axios'
import { GoSearch } from 'react-icons/go'

// API_ENDPOINTS
const CountryName = `https://restcountries.com/v2/name`
const Regional = `https://restcountries.com/v3.1/region`

const regions = [
  {
    id: 1,
    name: 'Asia',
  },
  {
    id: 2,
    name: 'Oceania',
  },
  {
    id: 3,
    name: 'Antartic',
  },
  {
    id: 4,
    name: 'Africa',
  },
  {
    id: 5,
    name: 'Americas',
  },
  {
    id: 6,
    name: 'Europe',
  },
]
const Inputs = ({ setCountry }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [regionValue, setRegionValues] = useState('')

  // there was a bit issue while using the uniques values to filter item so ignore it
  // const uniqueValue = [...new Set(countryRegion.map((region) => region.region))]

  const MapRegiones = regions.map((region) => region.name)

  const checkValue = async (val) => {
    setRegionValues(val.target.value)

    try {
      const response = await axios.get(`${Regional}/${regionValue}`)
      const result = await response.data
      let filterItem = result.filter((region) => region.region === regionValue)
      setCountry(filterItem)
    } catch (error) {
      console.log(error)
    }
  }

  const getCountryName = async (title) => {
    try {
      const response = await axios.get(`${CountryName}/${title}`)
      const singleData = await response.data
      console.log(singleData)
      setCountry(singleData)
    } catch (error) {
      console.log(error)
    }
  }

  const preventDefault = (e) => {
    e.preventDefault()
    setSearchTerm('')
  }
  return (
    <div className="input__wrapper">
      <form aria-labelledby='`' className="form" onSubmit={preventDefault}>
        <label htmlFor="inputElement">
          <GoSearch className="icon" />
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={() => getCountryName(searchTerm)}
          placeholder="search for a country..."
          id="inputElement"
        />
      </form>

      <div>
        <select
          aria-label="State"
          className="select__option"
          value={regionValue}
          onChange={checkValue}
        >
          <option value="1">filter by region</option>
          {MapRegiones.map((region, index) => {
            return (
              <option value={region} key={index}>
                {region}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default Inputs
