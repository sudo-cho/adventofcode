const fs = require('fs')
const { getFileContents } = require('../utils/helpers.js')

const {
  compose,
  map,
  replace,
  sort,
  apply
} = require('ramda')

const valuesFromFile = compose(
  arr => arr.find((v, i, a) => i > 0 && v - a[i - 1] > 1) - 1,
  // part 1
  // apply(Math.max),
  sort((a, b) => a - b),
  map(compose(
    elm => parseInt(elm, 2),
    replace(/(B|R)/g, 1),
    replace(/(F|L)/g, 0)
  )),
  getFileContents('day05/input')
)(fs)

console.log(valuesFromFile)
