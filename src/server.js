const WebSocket = require('ws')
const chalk = require('chalk')
const getMessage = require('./helper').getServerMessage

module.exports = options => {

  const { port } = options

  const clients = {}
  let needHandler = true

  const webSocketServer = new WebSocket.Server({ port })

  webSocketServer.on('connection', ws => {

    const client = clients.gulp ? 'browser' : 'gulp'
    clients[client] = ws
    console.log(getMessage('Connected', client))

    ws.on('close', () => {
      delete clients[client]
      console.log(getMessage('Disconnected', client))
    })

    if (needHandler && clients.gulp) {
      needHandler = false
      clients.gulp.on('message', message => {
        // console.log(getMessage('Received message from', client), `: ${message}`)
        clients.browser && clients.browser.send(message)
      })
    }
  })
}
