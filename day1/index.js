const fs = require('fs')
const kcomb = require("foreach-combination")

const {
  invoker,
  compose,
  toString,
  split,
  map,
  init,
  equals,
  sum,
} = require('ramda')

const rfs = invoker(1, 'readFileSync')

const valuesFromFile = compose(
  map(elm => +(elm)),
  init,
  split('\n'),
  toString,
  rfs('day1/input')
)(fs)

let rep;
kcomb(valuesFromFile, 3, (x, y, z) => {
  if (compose(equals(2020), sum)([x,y,z])) {
    rep = x * y * z
  }
})

console.log(rep)
