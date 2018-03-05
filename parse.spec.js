const fs = require('fs')
const tokenize = require('./tokenize')
const parse = require('./parse')

// test
const tks = tokenize(fs.readFileSync('./tests/src.example', 'utf8'))

parse(tks)
