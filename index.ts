import _ from 'lodash/core'

const REGEX = /([$]\w+)\W/g

const VARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const SIZE = VARS.length

export class Minifier {
  private readonly toReplace: Map<string, number> = new Map()
  private readonly mapping: Map<string, string> = new Map()
  private nextVarID = 0
  //private readonly nextVar = [0, 0, 0, 0, 0]
  private readonly excluded: string[]

  constructor(excluded: string[] = []) {
    this.excluded = excluded
  }

  public minify(code: string): string {
    const matches1 = code.match(REGEX)
    if (matches1 != null) {
      for (const match of matches1) {
        REGEX.lastIndex = 0
        const name = REGEX.exec(match)![1]
        if (this.excluded.indexOf(name) === -1) {
          const oldNumber = this.toReplace.get(name) || 0
          this.toReplace.set(name, oldNumber + 1)
        }
      }
    }
    return this.apply(code)
  }

  private apply(code: string): string {
    const sorted = _.sortBy(Array.from(this.toReplace.entries()),
      [(a: [string, number], b: [string, number]) => {
        return a[1] - b[1]
      }]) as Array<[string, number]>
    this.toReplace.clear()

    for (const [key] of sorted) {
      if (!this.mapping.has(key)) {
        this.mapping.set(key, this.getNextVar())
      }
      const mapping = this.mapping.get(key)
      const regex = new RegExp(`${key.replace('$', '\\$')}(\\W)`, 'g')
      code = code.replace(regex, `${mapping}$1`)
    }
    return code
  }

  private getNextVar(): string {
    let v = ''
    let n = this.nextVarID++
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
