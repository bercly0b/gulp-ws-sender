const WebSocket = require('ws')
const getMessage = require('./helper').getServerMessage

module.exports = port => {
  const clients = {}
  let needHandler = true

  const webSocketServer = new WebSocket.Server({ port })

  webSocketServer.on('connection', ws => {
    const client = clients.sender ? 'browser' : 'sender'
    clients[client] = ws
    console.log(getMessage('Connected', client))

    ws.on('close', () => {
      delete clients[client]
      console.log(getMessage('Disconnected', client))
    })

    if (needHandler && clients.sender) {
      needHandler = false
      clients.sender.on('message', message => {
        // console.log(getMessage('Received message from', client), `: ${message}`)
        clients.browser && clients.browser.send(message)
      })
    }
  })
}
