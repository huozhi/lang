const {ASM, POO_LSIZE} = require('./consts')
const REG = require('./register')

function execute(text) {
  REG.pc.receive(text, 0)

  let op
  while (true) {
    op = REG.pc.inc
    // console.log('op', op)
    if (op === ASM.IMM) { REG.ax = REG.pc.inc }
    else if (op === ASM.LC || op === ASM.LI || op === ASM.LV) { REG.ax = REG.ax } // TODO: load real address
    else if (op === ASM.SC || op === ASM.SI || op === ASM.SV) { REG.sp.inc = REG.ax }
    else if (op === ASM.PUSH) { REG.sp.dec = REG.ax }

    else if (op === ASM.ADD) { REG.ax = REG.sp.inc + REG.ax }
    else if (op === ASM.SUB) { REG.ax = REG.sp.inc - REG.ax }
    else if (op === ASM.MUL) { REG.ax = REG.sp.inc * REG.ax }
    else if (op === ASM.DIV) { REG.ax = REG.sp.inc / REG.ax }
    else {
      break
    }
  }
  // console.log('sp', REG.sp, 'ax', REG.ax)
}

const VM = {
  emitted: [],
  execute: () => execute(VM.emitted),
}

module.exports = VM
