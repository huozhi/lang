const fs = require('fs')
const path = require('path')
const Source = require('../source')
const parse = require('../parse')

const example = fs.readFileSync(path.resolve(__dirname, '../fixture/example'), 'utf8')
console.log(example)
Source.initialize(example)

parse()
