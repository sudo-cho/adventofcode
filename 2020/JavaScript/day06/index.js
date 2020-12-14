const fs = require('fs')
const { getFileContentsWithSpaceInMac } = require('../utils/helpers.js')

const {
  compose,
  map,
  split,
  length,
  sum,
  reduce,
  union,
  intersection
} = require('ramda')

const valuesFromFile = compose(
  sum,
  map(compose(
    length,
    // using Array.prototype.reduce, somehow R.reduce doesn't work for intersection
    arr => arr.reduce(intersection),
    // part 1
    // reduce(union, 0),
    map(split(''))
  )),
  map(split(/\n/)),
  getFileContentsWithSpaceInMac('day6/input')
)(fs)

console.log(valuesFromFile)
