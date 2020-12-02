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
  equals
} = require('ramda')

const checkFirstPolicy = curry(({rule, char, pw}) => compose(
  arr => {
    const range = split('-')(rule)
    return length(arr) >= range[0] && length(arr) <= range[1]
  },
  filter(equals(char))
)(pw))

const checkSecondPolicy = curry(({rule, char, pw}) => {
  const range = compose(map(l => +(l)), split('-'))(rule)
  return compose(
    compose(equals(1), length),
    arr => Array.from(arr).filter(
      (ch, i) => {
        return char == ch
            && (i === range[0]-1
             || i === range[1]-1)
      })
  )(pw)
})

const valuesFromFile = compose(
  length,
  //   filter(checkFirstPolicy),
  filter(checkSecondPolicy),
  map(compose(
    applySpec({
      rule: nth(0),
      char: compose(init, nth(1)),
      pw: nth(2)
    }),
    split(' ')
  )),
  getFileContents('day2/input')
)(fs)

console.log(valuesFromFile)
