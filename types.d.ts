import { SourceMap } from 'magic-string'

export class ES6ClassMinify {
  public minify(code: string): { code: string, map: SourceMap }
}
