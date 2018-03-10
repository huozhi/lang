const fs = require('fs')
const path = require('path')

let i = 0
let str = ''

const Source = {
  get index() { return i },
  get val() { return str[i] },

  read: () => str[i++],
  next: () => str[++i],
  at: (idx) => str[idx],
  peek: () => str[i + 1],
  eof: () => i === str.length,
  initialize(text) { str = text; i = 0; },
}

module.exports = Source
