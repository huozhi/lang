const poolsize = 256 * 256

class Stack {
  constructor(start) {
    this._data = Array(poolsize)
    this._index = start || 0
  }

  get inc() { return this._data[this._index++] }
  set inc(val) { return this._data[this._index++] = val }

  get dec() { return this._data[--this._index] }
  set dec(val) { return this._data[--this._index] = val }

  set i(val) { this._index = val }
  get back() { return this._data[this._data.length - 1] }
  get front() { return this._data[0] }
}

let text
let data

let pc // program counter
let bp // base pointer
let sp // stack pointer

pc = new Stack(0)
bp = sp = new Stack(poolsize) // ?? change to index

let ax = 0
let cycle

const current = (arr) => arr[arr.length - 1]

const [
  LEV, // leave: pop stack
  IMM,
  LI, LC, // load int, load char
  SI, SC, // save int, save char
  PUSH,
  ADD,
  EXIT,
] = Array(100).fill().map((_, i) => 128 + i)

let op
let tmp

function eval() {
  while (true) {
    op = pc.inc
    console.log('op', op)
    if (op === IMM) { ax = pc.inc }
    else if (op === LC || op === LI) { ax = ax } // ?
    else if (op === SC || op === SI) { sp.inc = ax }
    else if (op === PUSH) { sp.dec = ax }
    else if (op === ADD) { ax = sp.inc + ax }
    else {
      return
    }
  }
}

text = new Stack()
text.inc = IMM
text.inc = 3
text.inc = PUSH
text.inc = IMM
text.inc = 20
text.inc = ADD
text.inc = PUSH
text.inc = EXIT
pc = text
pc.i = 0


eval()

console.log(sp.back)
