import axios from 'axios'

require('dotenv').config();
console.log( process.env.REACT_APP_BASE_URL)

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})
