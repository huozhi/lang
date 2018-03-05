const OPERS = '()<>+-*/='
const SIGNS = '{}'
const KEY_WORDS = ['while', 'if', 'else']

function isKeyWord(ident) {
  return ~KEY_WORDS.indexOf(ident)
}

function isSign(chr) {
  return ~SIGNS.indexOf(chr[0])
}

function isOper(chr) {
  return ~OPERS.indexOf(chr[0])
}

function isDigit(chr) {
  chr = chr[0]
  return chr >= '0' && chr <= '9'
}

function isAlpha(chr) {
  chr = chr[0]
  return (chr >= 'a' && chr <= 'z') || (chr >= 'A' && chr <= 'Z')
}

function tokenize(s) {
  let i = 0
  const tokens = []
  while (i < s.length) {
    if (isDigit(s[i])) {
      let value = 0
      while (isDigit(s[i])) {
        value = value * 10 + (+s[i++])
      }
      tokens.push({
        type: 'NUMBER',
        value,
      })
    } else if (isAlpha(s[i]) || s[i] === '_') {
      let ident = ''
      while (isAlpha(s[i]) || s[i] === '_' || isDigit(s[i])) ident += s[i++]
      tokens.push({
        type: isKeyWord(ident) ? 'KEYWORD' : 'IDENTIFIER',
        value: ident,
      })
    } else if (isOper(s[i])) {
      tokens.push({
        type: 'OPERATOR',
        value: s[i++],
      })
    } else if (isSign(s[i])) {
      tokens.push({
        type: 'SIGN',
        value: s[i++],
      })
    } else if (s[i] === ';') {
      tokens.push({
        type: 'EOL',
        value: s[i++],
      })
    } else {
      i++
    }
  }
  return tokens
}

module.exports = tokenize
