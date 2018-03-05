// expr: NUMBER
// | OP expr
// | ( expr )
// block      : '{' {statement ';'} '}'
// statement  : 'if' expr block ['else' block]
//            | 'while' expr block
//            | expr
// program    : [statement ';']

function parse(tokens) {
  let tk
  const indents = []
  const indent = () => indents.push('  ')
  const unindent = () => indents.pop()
  const indentcall = (fn) => { indent(); fn(); unindent()  }

  // execute
  statement()

  function next() {
    tk = tokens.length ? tokens.shift() : null
    // logging
    if (tk) {
      if (tk.value === '{' || tk.value === '}' || tk.value === ';') {
        // tk.value
      } else {
        process.stdout.write(tk.value + ' ')
      }
    }
  }

  function statement() {
    while (!tk || tk.type === 'EOL') next()
    if (tk.value === 'while') {
      next('('); expr(); next(')')
      block()
    } else if (tk.type === 'IDENTIFIER') {
      expr()
    } else if (tk.type === 'EOL') {
      next()
    }
  }

  function block() {
    next('{')
    while (tk && tk.value !== '}') {
      statement()
    }
    next('}')
  }

  function expr() {
    if (tk && tk.type === 'EOL') return
    next()
    if (!tk) return
    if (tk.value === '(') {
      while (tk && tk.value !== ')') expr()
      next(')')
    } else if (tk.type === 'OPERATOR' && tk.value !== ')') {
      expr()
    } else if (tk.type === 'NUMBER') {
      expr()
    } else if (tk.type === 'EOL') {
      next(';')
    } else if (tk.type === 'IDENTIFIER') {
      expr()
    }
  }
}

module.exports = parse
