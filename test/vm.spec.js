const {ASM} = require('../consts')
const REG = require('../register')
const VM = require('../vm')

const VM.emitted = [
  ASM.IMM,
  3,
  ASM.PUSH,
  ASM.IMM,
  20,
  ASM.ADD,
  ASM.PUSH,
  ASM.EXIT,
]

VM.execute()

console.log(REG.sp.back)
