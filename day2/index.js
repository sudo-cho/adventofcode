const fs = require('fs')
const { getFileContents } = require('../utils/helpers.js')

const {
  compose,
  applySpec,
  map,
  nth,
  length,
  filter,
  init,
  split,
  curry,
  equals,
  toPairs,
  last,
  head,
  both,
  anyPass
} = require('ramda')
const { inRange } = require('ramda-adjunct')

const checkFirstPolicy = curry(({rule, char, pw}) => compose(
  compose(inRange(rule[0], rule[1]+1), length),
  filter(equals(char))
)(pw))

// needed to be fixed
const checkSecondPolicy = curry(({rule, char, pw}) => compose(
  compose(equals(1), length),
  filter(both(
    compose(equals(char), last),
    anyPass([
      compose(equals(rule[0] - 1), head),
      compose(equals(rule[1] - 1), head)
    ])
  )),
  toPairs
)(pw))

const valuesFromFile = compose(
  length,
  // choose policies here
  filter(checkSecondPolicy),
  map(compose(
    applySpec({
      rule: compose(map(l => +(l)), split('-'), nth(0)),
      char: compose(init, nth(1)),
      pw: nth(2)
    }),
    split(' ')
  )),
  getFileContents('day2/input')
)(fs)

console.log(valuesFromFile)
