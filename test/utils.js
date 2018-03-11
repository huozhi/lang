const fs = require('fs')
const path = require('path')

const readFile = (filename) => fs.readFileSync(path.resolve(__dirname, filename), 'utf8')

module.exports = {readFile}
