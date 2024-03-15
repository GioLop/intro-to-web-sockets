const http = require('http')
const { WebSocketServer } = require('ws')
const uuidv4 = require('uuid').v4

const url = require('url')

const server =  http.createServer()
const wsServer = new WebSocketServer({ server })

const PORT = 8000

const connections = {}
const users = {}

const handleMessage = (bytes, uuid) => {
  const message = JSON.parse(bytes.toString())
  const user = users[uuid]
  user.state = message
  broadcast()
}

const handleClose = uuid => {
  console.log(`${users[uuid].username} disconnected`)
  delete connections[uuid]
  delete users[uuid]
  broadcast()
}

const broadcast = () => {
  Object
    .keys(connections)
    .forEach(uuid => {
      const connection = connections[uuid]
      const message = JSON.stringify(users)
      connection.send(message)
    })
}

wsServer.on('connection', (connection, request) => {
  const { username } = url.parse(request.url, true).query
  console.log(`${username} connected`)
  const uuid = uuidv4()

  connections[uuid] = connection

  users[uuid] = {
    username,
    state: {}
  }

  connection.on('message', mesage => handleMessage(mesage, uuid))
  connection.on('close', () => handleClose(uuid))
})

server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`)
})