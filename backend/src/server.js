  require('dotenv/config')

  //console.log(process.env.MONGO_URLSTRING)

  const path = require('path')
  const http = require('http')
  const mongoose = require('mongoose')
  const socketio = require('socket.io')
  const express = require('express')
  const cors = require('cors')
  
  const routes = require('./routes')

  const app = express()
  const server = http.Server(app)
  const io = socketio(server)
  const connectedUsers = {}

  mongoose.connect(process.env.MONGO_URLSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  
  io.on('connection', socket => {
    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id
  })

  //middleware
  app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
  })

  app.use(cors())
  app.use(express.json())
  app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
  app.use(routes)

  server.listen(3333)
