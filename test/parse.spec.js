const Source = require('../source')
const parse = require('../parse')
const utils = require('./utils')
const VM = require('../vm')

const example = utils.readFile('../fixture/expression')
Source.initialize(example)
parse()

utils.logEmittedCode(VM.emitted)
