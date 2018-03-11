const {POO_LSIZE} = require('./consts')

class SimulatePointer {
  constructor(start) {
    this._data = Array(POO_LSIZE)
    this._index = start || 0
  }

  get inc() { return this._data[this._index++] }
  set inc(val) { return this._data[this._index++] = val }

  get dec() { return this._data[--this._index] }
  set dec(val) { return this._data[--this._index] = val }

  // set i(val) { this._index = val }

  get val() { return this._data[this._index] }
  get back() { return this._data[this._data.length - 1] }
  get front() { return this._data[0] }

  receive(data, index) { this._data = data; this._index = index; }
}

const REG = {
  ax: 0, // value register
  bx: 0, // address register, program counter index
  pc: null,
  bp: null,
  sp: null,
}

REG.pc = new SimulatePointer(0)
REG.bp = REG.sp = new SimulatePointer(POO_LSIZE)

module.exports = REG
