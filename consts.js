const Const = (keys) => keys.reduce((enums, key) => (enums[key] = key, enums), {})

/*
 * iEnum = Enum(['a', 'b', 'c'], 128)
 * iEnum.expect(128) // 'a'
 */
const Enum = (keys, start = 1) => {
  const e = keys.reduce((enums, key) => (enums[key] = start++, enums), {})

  Object.defineProperty(e, 'expect', {
    value: (val) => Object.keys(e).find(k => e[k] === val),
  })

  return e
}
const POO_LSIZE = 1024

const ASM = Const([
  'LEA', 'IMM', 'ENT',
  // save value / load value -- simulation
  'LI', 'SI', 'LC', 'SC', 'SV', 'LV', 'PUSH',
  'ADD', 'SUB', 'MUL', 'DIV',
  'EXIT',
])

const TK = Enum([
  'Num', 'Global', 'Ident', 'Str',
  'Else', 'If', 'Var', 'Return', 'While',
  'Assign', 'Add', 'Sub', 'Mul', 'Div',
])


module.exports = {ASM, TK, POO_LSIZE}
