import fs from 'fs'

const input = fs
  .readFileSync('input')
  .toString()
  .split(/\n/)
  .slice(0, -1)
  .map(e => e.split(','))
  .map(e => e.map(f => f.split('-').map(f => +(f))))

const checkInRange = elm => 
  elm[0] <= elm[2] && elm[1] >= elm[3]
    || elm[2] <= elm[0] && elm[3] >= elm[1]

const checkOverlap = elm => 
  elm[0] >= elm[2] && elm[1] <= elm[3]
    || elm[1] >= elm[2] && elm[1] <= elm[3]
    || elm[2] >= elm[0] && elm[2] <= elm[1]
    || elm[3] >= elm[0] && elm[3] <= elm[1]

const p1 = input
  .map(e => checkInRange(e.flat()))
  .filter(e => e === true).length

const p2 = input
  .map(e => checkOverlap(e.flat()))
  .filter(e => e === true).length

console.log(p1, p2)
