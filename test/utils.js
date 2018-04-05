const fs = require('fs')
const path = require('path')

const readFile = (filename) => fs.readFileSync(path.resolve(__dirname, filename), 'utf8')

const logEmittedCode = (emitted) => {
  for (let i = 0; i < emitted.length; i++) {
    const command = emitted[i].toString()
    let text = command
    if (command === 'IMM') {
      text += (' ' + emitted[++i].toString())
    }
    console.log(text)
  }
}

module.exports = {readFile, logEmittedCode}
