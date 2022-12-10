import fs from 'fs'

const input = fs
.readFileSync('input')
.toString()
.split(/\n/)
.slice(0, -1)
.slice(1)

const cursor = []

const p1Input = input.reduce((a, b) => {
  const b0 = b.split(' ')[0]

  switch (true) {
    case /cd [a-zA-Z]/.test(b):
      cursor.push(b.split(' ')[2])
      a[cursor.at(-1)] = []
      break
    case b0 === 'dir':
      a[cursor.at(-1)]?.push(b.split(' ')[1])
      break
    case !isNaN(b0):
      a[cursor.at(-1)]?.push(b0)
      break
    case /cd ../.test(b):
      a[cursor.at(-2)]?.push(...a[cursor.at(-1)])
      a[cursor.at(-2)]?.splice(
        a[cursor.at(-2)].findIndex(e => e === cursor.at(-1)),
        1
      )
      cursor.pop()
      break
  }

  return a
}, {})

const p1 = Object
  .values(p1Input)
  .map(e => e.map(f => +(f)).reduce((a, b) => a + b))
  .filter(e => e <= 100000)
  .reduce((a, b) => a + b)

const p2 = Object
  .values(p1Input)
  .map(e => e.map(f => +(f)).reduce((a, b) => a + b))
  .filter(e => e <= 30000000)
  .sort((a, b) => a - b)[0]

console.log(p1, p2)
