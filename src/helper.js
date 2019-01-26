const chalk = require('chalk')

const getTime = () => {
  const now = new Date()
  const add0 = n => n > 9 ? n : '0' + n
  return `${add0(now.getHours())}:${add0(now.getMinutes())}:${add0(now.getSeconds())}`
}

const getClientMessage = type => {
  const time = getTime()
  return `[${chalk.gray(time)}] ${chalk.yellow(type)} was sent`
}

const getServerMessage = (action, client, color = 'green') => {
  const time = getTime()
  return `[${chalk.gray(time)}] ${action} ${chalk[color](client)}`
}

module.exports = { getClientMessage, getServerMessage }
