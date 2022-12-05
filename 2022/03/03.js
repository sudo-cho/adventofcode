import fs from "fs"

const letterList = 
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

// I don't want to rely on external utils so everything works
// by copy/pasting code into node compiler
const input = fs
.readFileSync('input')
.toString()
.split(/\n/)
.slice(0, -1)

// possible refactorisation by externalizing functions to replace
// letter by its corresponding value and reducers by sum function

const part1 = input
.map(
  e => e.slice(0, e.length / 2).split('').filter(
    a => e.slice(e.length / 2, e.length).includes(a)
  )
)
.map(f => f.slice(0, 1)).map(
  g => letterList.split('').findIndex(h => h === g[0]) + 1
)
.reduce((l1, l2) => l1 + l2, 0)

const part2 = input
.reduce((e, a, i) => {
  const ch = Math.floor(i / 3)
  e[ch] = [].concat((e[ch]||[]), a)
  return e
}, [])
.map(elm => elm
  .map(subElm => [...subElm])
  .reduce((f, g) => f.filter(h => g.includes(h)))
  .slice(0, 1).map(
    g => letterList.split('').findIndex(h => h === g[0]) + 1
  )
)
.flat()
.reduce((l1, l2) => l1 + l2, 0)

console.log(part1, part2)
