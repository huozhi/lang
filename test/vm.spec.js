const {ASM} = require('../consts')
const REG = require('../register')
const vm = require('../vm')

const commands = [
  ASM.IMM,
  3,
  ASM.PUSH,
  ASM.IMM,
  20,
  ASM.ADD,
  ASM.PUSH,
  ASM.EXIT,
]

vm(commands)
console.log(REG.sp.back)
