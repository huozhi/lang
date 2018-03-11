const Source = require('../source')
const parse = require('../parse')
const REG = require('../register')
const utils = require('./utils')
const VM = require('../vm')
const example = utils.readFile('../fixture/expression')

Source.initialize(example)

parse()

console.log(VM.emitted)
VM.execute()
console.log(REG.ax)
