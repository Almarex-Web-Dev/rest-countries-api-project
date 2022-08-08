import React, { useState, useEffect } from 'react'
import { Header, CountryLists } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SingleCountry } from './components'

import './App.css'

const App = () => {
  const [colorTheme, setColorTheme] = useState('')

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
    setColorTheme(currentTheme)
  }, [])

  const modeClick = (theme) => {
    setColorTheme(theme)
    localStorage.setItem('theme', theme)
  }

  return (
    <>
      <div className={`App ${colorTheme ? 'dark' : 'light'}`}>
        <BrowserRouter>
          <Header modeClick={modeClick} colorTheme={colorTheme} />
          <Routes>
            <Route path="/" element={<CountryLists />} />
            <Route path="/country/:name" element={<SingleCountry />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
