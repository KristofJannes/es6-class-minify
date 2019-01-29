const _ = require('lodash/core')
const MagicString = require('magic-string')

const REGEX = /(\$\w+)\W/g

const VARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const SIZE = VARS.length

class ES6ClassMinify {
  constructor() {
    this._mapping = new Map()
    this._nextVarID = 0
  }

  minify(code) {
    this._scanFile(code)

    const magicCode = new MagicString(code)

    for (const [name, newName] of this._mapping) {
      const regex = new RegExp(`${name.replace('$', '\\$')}\\W`, 'g')

      while (true) {
        const match = regex.exec(code)
        if (match == null) {
          break
        }
        magicCode.overwrite(match.index, match.index + name.length, newName)
      }
    }

    return {
      code: magicCode.toString(),
      map: magicCode.generateMap({hires: true}),
    }
  }

  _scanFile(code) {
    const toReplace = new Map()
    const matches1 = code.match(REGEX)
    if (matches1 != null) {
      for (const match of matches1) {
        REGEX.lastIndex = 0
        const name = REGEX.exec(match)[1]
        toReplace.set(name, (toReplace.get(name) || 0) + 1)
      }
    }
    const sorted = _.sortBy(Array.from(toReplace.entries()), [(a, b) => a[1] - b[1],])
    for (const [key] of sorted) {
      if (!this._mapping.has(key)) {
        this._mapping.set(key, this._getNextVar())
      }
    }
  }

  _getNextVar() {
    let v = ''
    let n = this._nextVarID++
    let done = false
    while (!done) {
      const r = n % SIZE
      if (r === n) {
        done = true
      }
      v = VARS[r] + v
      n = ((n / SIZE) >>> 0) - 1
    }
    return v
  }
}

exports.ES6ClassMinify = ES6ClassMinify
