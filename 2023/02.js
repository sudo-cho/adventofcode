import fs from 'fs'

const rules = { blue: 14, red: 12, green: 13 }

const input = fs
  .readFileSync('input')
  .toString()
  .trim()
  .split(/\n/)


const result1 = input
  .map(e => e.split`:`)
  .map(e => ({ [e[0].split` `[1]]: [...e[1].trim().split(/,|;/)] }))
  .filter(h => Object.values(h)[0].filter(
    j => j.trim().split` `[0] > rules[j.trim().split` `[1]]
  ).length === 0)
  .map(l => +(Object.keys(l)))
  .flat()
  .reduce((a, b) => a + b, 0)

// actually, using regex makes everything easier
const result2 = input
  .map(e => [...e.matchAll(`(\\d+) (.)`)]
    .reduce((e, r) => (e[r[2]] = e[r[2]] > r[1] ? e[r[2]] : 0 | r[1], e), {})
  )
  .reduce((e, r) => e + r.r * r.g * r.b, 0)

console.log(result2)
