const REG = require('./register')
const Source = require('./source')
const Context = require('./context')
const next = require('./tokenize')
const {emitted} = require('./vm')
const {ASM, TK} = require('./consts')

const error = (message = '') => { throw new Error('PARSE ERR: ' + message) }

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
  } else if (Context.token === '{') {
    block()
  } else if (Context.token === ';') {
    next()
  } else {
    // console.log('')
    expr(TK.Assign)
    if (Context.token === ';') { next(';') } else { error(`expected ; ${TK.expect(Context.token)}`) }
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
  // console.log('Source.val', Source.val)
  if (Context.token === TK.Num) {
    // console.log('push value', Context.value)
    emitted.push(ASM.IMM)
    emitted.push(Context.value)
    next();
  } else if (Context.token === '(') {
    next('(')
    expr(TK.Assign)
    if (Context.token === ')') { next(')') } else { error('missing brace') }
  }

  while (Context.token >= level) {
    // console.log('level', level)
    if (Context.token === TK.Add) { next(); emitted.push(ASM.PUSH); expr(TK.Mul); emitted.push(ASM.ADD) }
    else if (Context.token === TK.Sub) { next(); emitted.push(ASM.PUSH); expr(TK.Mul); emitted.push(ASM.SUB) }
    else if (Context.token === TK.Mul) { next(); emitted.push(ASM.PUSH); expr(TK.Inc); emitted.push(ASM.MUL) }
    else if (Context.token === TK.Div) { next(); emitted.push(ASM.PUSH); expr(TK.Inc); emitted.push(ASM.DIV) }
    else if (Context.token === ';') {
      next(';')
    } else if (Context.token === TK.Ident) {
      // TODO: token is identifier
    } else { error('parsing fail ' + Context.token) }
  }
}

module.exports = statement
