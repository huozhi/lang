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

  get len() { return this._index + 1 }
  get val() { return this._data[this._index] }
  get back() { return this._data[this._data.length - 1] }
  get front() { return this._data[0] }

  receive(data, index) { this._data = data; this._index = index; }
}

const Store = {
  // registers
  ax: 0, // value register
  bx: 0, // address register, program counter index
  pc: null,
  bp: null,
  sp: null,

  // global static
  data: null, // data section
}

Store.pc = new SimulatePointer()
Store.bp = Store.sp = new SimulatePointer(POO_LSIZE)
Store.data = new SimulatePointer()

function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/*
 * Address
 * eg, Address('data', 2), we get value from Store['data'][2]
 */
function Address(name, offset) {
  if (offset == null) {
    // cannot be integer type register
    offset = Store[name].len
  }

  const address = {
    id: uuid(),
    type: 'Address',
    name,
    offset,
    load() { return Store[name][offset] },
    assign(value) { Store[name][offset] = value },
    toString() { return this.id }
  }

  // inc for global var
  Store[name].inc = address

  return address
}

module.exports = {Store, Address}

