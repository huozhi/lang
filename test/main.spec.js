const Source = require('../source')
const parse = require('../parse')
const {Store} = require('../storage')
const utils = require('./utils')
const VM = require('../vm')
const example = utils.readFile('../fixture/assignment')

Source.initialize(example)

parse()

utils.logEmittedCode(VM.emitted)

VM.execute()

console.log('Finall register value', Store.ax)