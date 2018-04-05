const {TK} = require('./consts')
const Source = require('./source')
const Context = require('./context')
const SymbolTable = require('./symbol-table')

function isDigit(chr) {
  return chr >= '0' && chr <= '9'
}

function isAlpha(chr) {
  return (chr >= 'a' && chr <= 'z') || (chr >= 'A' && chr <= 'Z')
}

function next() {
  while (!Source.eof()) {
    const ch = Source.read()
    // console.log('ch [', ch, ']')
    if (isDigit(ch)) {
      let value = (+ch)
      while (isDigit(Source.val)) {
        value = value * 10 + (+Source.read())
      }
      Context.value = value
      Context.token = TK.Num

      return
    } else if (isAlpha(ch) || ch === '_') {
      let ident = ch
      while (isAlpha(Source.val) || Source.val === '_' || isDigit(Source.val)) {
        // console.log('isAlpha', Source.val, isAlpha(Source.val))
        ident += Source.read()
      }
      // console.log('ident', ident, Context.token, TK.While)
      if (ident === 'while') Context.token = TK.While
      else if (ident === 'if') Context.token = TK.If
      else if (ident === 'else') Context.token = TK.Else
      else if (ident === 'var') Context.token = TK.Var // TODO: define
      else {
        Context.token = TK.Ident
        Context.value = ident
        
        SymbolTable.insert(ident, {type: TK.Ident, class: TK.Global})
      }
      return
    }
    else if (ch === '+') { Context.token = TK.Add; return }
    else if (ch === '-') { Context.token = TK.Sub; return }
    else if (ch === '*') { Context.token = TK.Mul; return }
    else if (ch === '/') { Context.token = TK.Div; return }
    else if (ch === '=') { Context.token = TK.Assign; return }
    else if (ch === '(' || ch === ')' || ch === '{' || ch === '}' || ch === ';') { Context.token = ch; return }
  }
}

module.exports = next
