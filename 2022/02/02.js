import fs from "fs"

const input = fs
  .readFileSync('input')
  .toString()
  .split(/\n/)
  .slice(0, -1)

const enumType = { X: 1, Y: 2, Z: 3 }

const enumScorePart1 = [
  { type: 'AX', score: 3},
  { type: 'AY', score: 6},
  { type: 'AZ', score: 0},

  { type: 'BX', score: 0},
  { type: 'BY', score: 3},
  { type: 'BZ', score: 6},

  { type: 'CX', score: 6},
  { type: 'CY', score: 0},
  { type: 'CZ', score: 3}
]

const enumScorePart2 = [
  { type: 'A X', score: 3 },
  { type: 'A Y', score: 4 },
  { type: 'A Z', score: 8 },

  { type: 'B X', score: 1 },
  { type: 'B Y', score: 5 },
  { type: 'B Z', score: 9 },

  { type: 'C X', score: 2 },
  { type: 'C Y', score: 6 },
  { type: 'C Z', score: 7 }
]

const resultArray = input.map(d => d.split(' ')).map(
  e => enumScorePart1.find(
    f => f.type === `${e[0]}${e[1]}`
  )?.score + enumType[e[1]]
).reduce((a, b) => a + b, 0)

const resultArray2 = input.map(
  e => enumScorePart2.find(f => f.type === e)?.score
).reduce((a, b) => a + b, 0)

console.log(resultArray, resultArray2)
