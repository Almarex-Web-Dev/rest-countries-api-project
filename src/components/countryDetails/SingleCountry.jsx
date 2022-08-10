import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
// import { Header } from '../../components'

const CountryName = `https://restcountries.com/v2/name`

const SingleCountry = () => {
  const { name } = useParams()
  const [singleItem, setSingleItem] = useState([])

  useEffect(() => {
    const getCountryName = async () => {
      try {
        const response = await axios.get(`${CountryName}/${name}`)
        const singleData = await response.data
        //   console.log(singleData)
        setSingleItem(singleData)
      } catch (error) {
        console.log(error)
      }
    }
    getCountryName()
  }, [name])

  const singleCountry = singleItem.map((country, i) => {
    return (
      <div className="list" key={i}>
        <img src={country.flags.png} alt="flags" />
        <div className="singleList__wrapper">
          <div className="country__description">
            <div className="description__1">
              <h1>{country.name}</h1>
              <p>
                <b>Native Name:</b> {country.nativeName}
              </p>
              <p>
                <b>Population: </b> {country.population}
              </p>
              <p>
                <b>Region: </b> {country.region}
              </p>
              <p>
                <b>Sub Region: </b>
                {country.subregion}
              </p>
              <p>
                <b>Capital:</b> {country.capital}
              </p>
            </div>
            <div className="description__2">
              <p>
                <b>Top Level Domain:</b> {country.topLevelDomain}
              </p>
              <p>
                <b>Currency:</b> {country.currencies[0].code}
              </p>
              <p>
                <b>Language:</b> {country.languages[0].name}
              </p>
            </div>
          </div>
          <div className="border__countries">
            <h2>
              <b>Border Countries: </b>
            </h2>
            <div>
              {country.borders
                .slice(0, country.borders.length >= 0 && 3)
                .map((item) => {
                  return <span>{item}</span>
                })}
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <>
      <div className="singlecountry__wrapper">
        <div className="back__home">
          <Link to="/">
            <FiArrowLeft className="icon" />
          </Link>
        </div>
        <div className="country__details">{singleCountry}</div>
      </div>
    </>
  )
}

export default SingleCountry
