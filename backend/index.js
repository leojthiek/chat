const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const joinRoute = require('./router/router')
const chatRoute = require('./router/chatRoute')

const app = express()
const server = http.createServer(app)

const io = socketio(server)

app.use('/api',joinRoute)
app.use('/api/chat',chatRoute)

server.listen(5000,()=> console.log('server running in port 5000'))