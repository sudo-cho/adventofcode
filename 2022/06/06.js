import fs from 'fs'

const input = fs
  .readFileSync('input')
  .toString()
  .split('')
  .slice(0, -1)

const answer = s => input.map((e, i, a) => 
  new Set([e, ...a.slice(i + 1, i + s)]).size === s ? i + s : null
).filter(e => e)[0]

const p1 = answer(4)
const p2 = answer(14)

console.log(p1, p2)
