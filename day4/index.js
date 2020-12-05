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
  test,
  tap,
  reject,
  includes,
  dropLast,
  __,
  join
} = require('ramda')
const { inRange } = require('ramda-adjunct')

const valuesFromFile = compose(
  length,
  filter(compose(
    where({
      byr: test(/19[2-9]\d|200[0-2]/),
      iyr: test(/201\d|2020/),
      eyr: test(/202\d|2030/),
      hgt: test(/((1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in)/),
      hcl: test(/^#[0-9a-f]{6}$/),
      ecl: test(/^(amb|blu|brn|gry|grn|hzl|oth)$/),
      pid: test(/^[0-9]{9}$/)
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
