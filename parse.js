const Source = require('./source')
const Context = require('./context')
const next = require('./tokenize')
const {TK} = require('./consts')

// expr: NUMBER
// | OP expr
// | ( expr )
// block      : '{' {statement ';'} '}'
// statement  : 'if' expr block ['else' block]
//            | 'while' expr block
//            | expr
// program    : [statement ';']

function statement() {
  if (!Context.token && !Source.eof()) next()
  while (Context.token === ';') next()
  // console.log('statement', Context.token)
  if (!Source.eof() && Context.token === TK.While) {
    next('('); expr(); next(')')
    block()
  } else if (Context.type === TK.Ident) {
    expr()
  } else if (Context.token === ';') {
    next()
  }
}

function block() {
  next('{')
  while (!Source.eof() && Context.token !== '}') {
    statement()
  }
  next('}')
}

function expr(level) {
  if (Source.eof()) return
  if (!Source.eof() && Context.token === ';') return
  next()

  const {token, type} = Context

  if (token === '(') {
    while (token && token !== ')') expr()
    next(')')
  } else if ('+-*/='.indexOf(token) >= 0) {
    expr()
  } else if (type === TK.Num) {
    expr()
  } else if (token === ';') {
    next(';')
  } else if (type === TK.Ident) {
    expr()
  }
}

module.exports = statement
