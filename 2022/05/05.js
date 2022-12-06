import fs from 'fs'

const input = fs
  .readFileSync('input')
  .toString()
  .split(/\n\n/)

const startingPosition = input[0]
  .split('\n')
  .map(e => e.match(/.{1,4}/g) ?? [])
  .map((e, i, a) => a.map(r => r[i]).reverse())
  .map(e => 
    e.map(f => f.trim())
     .filter(g => g !== '')
     .map(g => g.split('')[1])
     .reverse()
     .slice(0, -1)
  )

const movements = input
  .at(-1)
  .split(/\n/)
  .slice(0, -1)
  .map(e => e.split(' ').filter(f => !isNaN(f)).map(g => +(g)))
  
const answer = movements.reduce((a, b) => {
  const newArray = a
  newArray[b[2] - 1] = [
    // for part 2, uncomment this and comment next line
    //...(newArray[b[1] - 1].splice(0, b[0])),
    ...(newArray[b[1] - 1].splice(0, b[0])).reverse(),
    ...newArray[b[2] - 1]
  ]
  return newArray
}, startingPosition)

console.log(answer)
