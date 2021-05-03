import { SpaceTraders } from "./index"

const spaceTraders = new SpaceTraders()

const functionNames: string[] = Object.getOwnPropertyNames(SpaceTraders.prototype)

const BLACKLIST_FUNCTIONS: string[] = [
  'constructor',
  'init',
  'getStatus',
  'createUser',
  'makeAuthRequest',
  'sendRequest',
  'makeUserPath',
  'makeHeaders',
  'initLimiter',
]
let blacklistSet = new Set(); for (const blacklistName of BLACKLIST_FUNCTIONS) blacklistSet.add(blacklistName);

function isUrlValid(f: Function) {
  let str = f.toString()
  let n = str.search(/url ?= ?this.makeUserPath\([`'"]?[\/]{0}(?=[\/\\]).*[`'"]?\)|url ?= ?[`'"][^\/].*[`'"]?\//g)
  if (n===-1) return true
  else return false
}

for (const functionName of functionNames) {
  if (blacklistSet.has(functionName)) continue
  // @ts-ignore: It doesn't like when I access the functions using [].
  let fn = spaceTraders[functionName]
  test(`${functionName} url is valid`, () => {
    expect(isUrlValid(fn)).toBe(true)
  })
}