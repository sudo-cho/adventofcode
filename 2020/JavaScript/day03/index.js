const fs = require('fs')
const { getFileContents, log } = require('../utils/helpers.js')

const {
  compose,
  length,
  filter,
  curry,
  toPairs,
  tap,
  juxt,
  product
} = require('ramda')
const { skipTake } = require('ramda-adjunct')

const getThreesFromSlope = curry(({ right, down }, arr) => compose(
  length,
  filter(row => row[1][(right * row[0]) % row[1].length] === '#'),
  toPairs,
  skipTake(down),
)(arr))

const valuesFromFile = compose(
  product,
  juxt([
    getThreesFromSlope({ right: 1, down: 1 }),
    getThreesFromSlope({ right: 3, down: 1 }),
    getThreesFromSlope({ right: 5, down: 1 }),
    getThreesFromSlope({ right: 7, down: 1 }),
    getThreesFromSlope({ right: 1, down: 2 })
  ]),
  getFileContents('day3/input')
)(fs)

console.log(valuesFromFile)
