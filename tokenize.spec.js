const tokenize = require('./tokenize')

// test
const tks = tokenize(fs.readFileSync('./tests/src.example', 'utf8'))
console.log(tks)
