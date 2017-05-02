const input = process.argv[2]
const bork = require('./bork.js')

require('require-yaml')
const { sayings } = require('./sayings.yaml')

console.log(input ? bork(input) : sayings.map(bork).join('\n'))
