const input = process.argv[2]
const bork = require('./bork.js')
const sayings = require('./sayings.js')

console.log(input ? bork(input) : sayings.map(bork).join('\n'))
