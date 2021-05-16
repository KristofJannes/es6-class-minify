import _ from "lodash/core.js";
import MagicString from "magic-string";

const REGEX = /\b(_\w+)\b/g;

const VARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default class ES6ClassMinify {
  constructor(exclude = [], vars = VARS) {
    this._mapping = new Map();
    this._nextVarID = 0;
    this._exclude = [...exclude, "_blank", "__moduleExports"];
    this._vars = vars;
  }

  minify(code) {
    this._scanFile(code);

    const magicCode = new MagicString(code);

    for (const [name, newName] of this._mapping) {
      const regex = new RegExp(`\\W${name}\\W`, "g");

      while (true) {
        const match = regex.exec(code);
        if (match == null) {
          break;
        }
        magicCode.overwrite(
          match.index + 1,
          match.index + 1 + name.length,
          newName
        );
        regex.lastIndex = match.index + 1;
      }
    }

    return {
      code: magicCode.toString(),
      map: magicCode.generateMap({ hires: true }),
    };
  }

  _scanFile(code) {
    const toReplace = new Map();
    const matches1 = code.match(REGEX);
    if (matches1 != null) {
      for (const match of matches1) {
        REGEX.lastIndex = 0;
        const name = REGEX.exec(match)[1];
        if (this._exclude.some((e) => name.startsWith(e))) {
          continue;
        }
        toReplace.set(name, (toReplace.get(name) || 0) + 1);
      }
    }
    const sorted = _.sortBy(Array.from(toReplace.entries()), [
      (a, b) => a[1] - b[1],
    ]);
    for (const [key] of sorted) {
      if (!this._mapping.has(key)) {
        this._mapping.set(key, this._getNextVar());
      }
    }
  }

  _getNextVar() {
    let v = "";
    let n = this._nextVarID++;
    let done = false;
    while (!done) {
      const r = n % this._vars.length;
      if (r === n) {
        done = true;
      }
      v = this._vars[r] + v;
      n = ((n / this._vars.length) >>> 0) - 1;
    }
    if (["do", "if", "in"].includes(v)) {
      return this._getNextVar();
    }
    return v;
  }
}
