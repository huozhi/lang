const Source = require('../source')
const parse = require('../parse')
const {Store} = require('../storage')
const utils = require('./utils')
const VM = require('../vm')
const example = utils.readFile('../fixture/assignment')

Source.initialize(example)

parse()

console.log(VM.emitted.map(e => e.toString()).join('\n'))
VM.execute()
console.log(Store.ax)
