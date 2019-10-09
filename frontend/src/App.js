import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import Routes from './routes'

import logo from './assets/logo.svg'
import './App.css'

function App() {
  return( 
  <BrowserRouter>
    <div className="container">
      <Link to="/dashboard">
        <img src={logo} alt="Aircnc" />
      </Link>

      <div className="content">
        <Routes />
      </div>
    </div>
  </BrowserRouter>
  )
}

export default App
