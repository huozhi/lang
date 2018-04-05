const {ASM} = require('../consts')
const {Store} = require('../storage')
const VM = require('../vm')

VM.load([
  ASM.IMM,
  3,
  ASM.PUSH,
  ASM.IMM,
  20,
  ASM.ADD,
  ASM.PUSH,
  ASM.EXIT,
])

VM.execute()

console.log(Store.sp.back)
