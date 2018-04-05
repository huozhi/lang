const {ASM, POO_LSIZE} = require('./consts')
const {Store} = require('./storage')

function execute(text) {
  Store.pc.receive(text, 0)

  let op
  while (true) {
    op = Store.pc.inc

    if (op === ASM.IMM) { Store.ax = Store.pc.inc }
    else if (op === ASM.LV) {
      Store.ax = Store.ax.load()
    }
    else if (op === ASM.SV) { 
      Store.sp.val.assign(Store.ax)
      Store.sp.inc
    }
    else if (op === ASM.PUSH) { Store.sp.dec = Store.ax }

    else if (op === ASM.ADD) { Store.ax = Store.sp.inc + Store.ax }
    else if (op === ASM.SUB) { Store.ax = Store.sp.inc - Store.ax }
    else if (op === ASM.MUL) { Store.ax = Store.sp.inc * Store.ax }
    else if (op === ASM.DIV) { Store.ax = Store.sp.inc / Store.ax }
    else {
      break
    }
  }
}

const VM = {
  emitted: [],
  execute: () => execute(VM.emitted),
  load: (commands) => VM.emitted.push.apply(...commands),
}

Object.defineProperty(VM.emitted, 'top', {
  get: () => VM.emitted[VM.emitted.length - 1],
  set: (value) => { VM.emitted[VM.emitted.length - 1] = value }
})

module.exports = VM
