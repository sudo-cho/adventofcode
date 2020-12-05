const fs = require('fs')
const { getFileContentsWithSpaceInMac, log } = require('../utils/helpers.js')

const {
  compose,
  equals,
  length,
  filter,
  curry,
  fromPairs,
  split,
  map,
  dissoc,
  keys,
  where,
  both,
  either,
  match,
  tap,
  reject,
  includes,
  join
} = require('ramda')
const { inRange, isNaN} = require('ramda-adjunct')

const validEyes = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

const getNumericHeight = compose(
  join(''),
  reject(isNaN),
  map(l => +(l)),
  split('')
)

const valuesFromFile = compose(
  length,
  filter(compose(
    where({
      byr: inRange(1920, 2002),
      iyr: inRange(2010, 2020),
      eyr: inRange(2020, 2030),
      hgt: either(
        both(
          includes('cm'),
          compose(inRange(150, 193), getNumericHeight)
        ),
        both(
          includes('in'),
          compose(inRange(59, 76), getNumericHeight)
        ),
      ),
      hcl: match(/r'#[0-9a-f]{6}'/),
      ecl: elm => includes(elm, validEyes),
      pid: match(/r'[0-9]{9}'/)
    })
  )),
  filter(compose(
    equals(7),
    length,
    keys,
    dissoc('cid')
  )),
  map(compose(
    fromPairs,
    map(split(':'))
  )),
  map(split(/\s+/)),
  getFileContentsWithSpaceInMac('day4/input')
)(fs)

console.log(valuesFromFile)
