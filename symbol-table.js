const {Address} = require('./storage')

/*
 * Symbol structure
 * {
 *   type: ident | ...
 *   class: global | local | ...
 *   value: type - Store.Address
 * }
 * 
 */

function SymbolTable() {
  const symbols = new Map()
  let currSymbol = null

  function find(ident) {
    return symbols.has(ident) ? symbols.get(ident) : null
  }

  function insert(ident, attributes) {
    if (!find(ident)) {
      attributes.value = Address('data')
      symbols.set(ident, attributes)
    }
    
    // for (const v of symbols.values()) console.log(v.value.load())

    return (currSymbol = symbols.get(ident))
  }

  return {
    find,
    insert,
    current() { return currSymbol }
  }
}

module.exports = SymbolTable()