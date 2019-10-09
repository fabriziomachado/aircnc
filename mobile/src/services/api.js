import axios from 'axios'

import serverConfig from '../config/server-config'

// require('dotenv').config();
// console.log(process.env.REACT_APP_BASE_URL)

const api = axios.create({
  baseURL: serverConfig.URL //process.env.REACT_APP_BASE_URL
})

export default api;