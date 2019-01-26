const WebSocket = require('ws')
const getMessage = require('./helper').getServerMessage

module.exports = class Server {
  constructor(port) {
    this.clients = {}
    this._init(port)
  }

  _init(port) {
    this.server = new WebSocket.Server({ port })

    this.server.on('connection', ws => {
      ws.id = Math.random().toString(36).substring(5)
      this.clients[ws.id] = ws
      console.log(getMessage('Connected', `browser (id: ${ws.id})`))

      ws.on('message', data => {
        console.log(getMessage('...to tab', `'${data}'`, 'yellow'))
      })

      ws.on('close', () => {
        delete this.clients[ws.id]
        console.log(getMessage('Disconnected', `browser (id: ${ws.id})`, 'red'))
      })
    })

    console.log(getMessage('Server is waiting for connection on port', port, 'magenta'))
  }

  send(data) {
    Object.values(this.clients).forEach(client => {
      if (client.readyState === WebSocket.OPEN) client.send(data)
    })
  }
}
