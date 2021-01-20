const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 1992
let allData = []

app.use(express.static(__dirname + '/dist'))

app.get('/', (req, res) => {
  res.send('<h1>Vuedle</h1>')
})

io.on('connection', (socket) => {
  console.log('a user connected', socket.id)

  if (allData.length) {
    socket.emit('draw', allData)
  }

  socket.on('draw', (data) => {
    allData.push(data)

    socket.broadcast.emit('draw', data)
  })

  socket.on('reset', () => {
    allData = []

    io.emit('reset', allData)
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
})

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
