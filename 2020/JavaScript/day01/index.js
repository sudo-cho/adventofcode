const fs = require('fs')
const kcomb = require('foreach-combination')
const { getFileContents } = require('../utils/helpers.js')

const {
  compose,
  map,
  equals,
  sum
} = require('ramda')

const valuesFromFile = compose(
  map(elm => +(elm)),
  getFileContents('day01/input')
)(fs)

let rep;
kcomb(valuesFromFile, 3, (x, y, z) => {
  if (compose(equals(2020), sum)([x,y,z])) {
    rep = x * y * z
  }
})

console.log(rep)
