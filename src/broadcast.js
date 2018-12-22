const PluginError = require('plugin-error')
const through = require('through2')
const Server = require('./server')
const getMessage = require('./helper').getClientMessage

module.exports = port => {
  const app = new Server(port)

  return options => {
    const { type } = options

    return through.obj(function(file, enc, cb) {
      if (file.isNull()) {
        cb(null, file)
        return
      }

      if (file.isStream()) {
        cb(new PluginError('gulp-ws-sender', 'Streaming not supported'))
        return
      }

      try {
        const prefix = type === 'js' ? 'js' : 'st'
        app.send(prefix + file.contents.toString())

        file.contents = Buffer.from(file.contents)
        this.push(file)
        console.log(getMessage(type))
      } catch (err) {
        this.emit('error', new PluginError('gulp-ws-sender', err, { showStack: true }))
        console.log(err)
      }

      cb()
    })
  }
}
