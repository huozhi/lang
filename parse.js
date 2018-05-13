const Source = require('./source')
const Context = require('./context')
const next = require('./tokenize')
const SymbolTable = require('./symbol-table')
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
//            | ident = expr
// function   : func fname '(' ... ')' '{' '}'
// 
// program    : [statement ';']

function statement() {
  if (!Context.token && !Source.eof()) next()

  if (!Source.eof() && Context.token === TK.While) {
    next('('); expr(); next(')')
    block()
  } else if (Context.token === '{') {
    block()
  } else if (Context.token === ';') {
    next() // // empty statement
  } else {
    expr(TK.Assign)
    if (Context.token === ';') { next(';') } else { error(`expected ; but get ${TK.expect(Context.token)}`) }
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
    if (Context.token === ')') { 
      next(')') 
    } else { 
      error('missing brace') 
    }
  } else if (Context.token === TK.Ident) {
    next() // Ident
    const symbol = SymbolTable.current()

    if (symbol.class === TK.Global) {
      emitted.push(ASM.IMM)
      emitted.push(symbol.value) // data address
    }
    emitted.push(ASM.LV)
    // Assume as global var 
    
    
  }

  while (Context.token >= level) {
    // console.log('level', level)
    if (Context.token === TK.Add) { next(); emitted.push(ASM.PUSH); expr(TK.Mul); emitted.push(ASM.ADD) }
    else if (Context.token === TK.Sub) { next(); emitted.push(ASM.PUSH); expr(TK.Mul); emitted.push(ASM.SUB) }
    else if (Context.token === TK.Mul) { next(); emitted.push(ASM.PUSH); expr(TK.Inc); emitted.push(ASM.MUL) }
    else if (Context.token === TK.Div) { next(); emitted.push(ASM.PUSH); expr(TK.Inc); emitted.push(ASM.DIV) }
    else if (Context.token === ';') {
      next(';')
    }
    else if (Context.token === TK.Assign) {
      next('=')
      // console.log('emitted.top', emitted.top)
      if (emitted.top === ASM.LV) { emitted.pop(); emitted.push(ASM.PUSH) }
      expr(TK.Assign)
      emitted.push(ASM.SV)
    }
     
    else { error('parsing fail ' + Context.token) }
  }
}

function func() {
  next() // function name
  // params
  next('(')
  
  let paramOffset = 0
  while (Context.token !== ')') {
    next()
    
    Context.token = TK.Ident
    Context.value = ident
    
    SymbolTable.insert(ident, {type: TK.Ident, class: TK.Local})
    paramOffset++

    if (Context.token === ',') next(',')
  }
  next(')')
  next('{')
  while (Context.token !== '}') {
    statement()
  }
}

function parse() {
  while (!Source.eof()) {
    statement()
  }
}

module.exports = parse
