const fs = require('fs')
const { getFileContentsWithSpaceInMac } = require('../utils/helpers.js')

const {
  compose,
  length,
  filter,
  fromPairs,
  split,
  map,
  where,
  test
} = require('ramda')

const valuesFromFile = compose(
  length,
  filter(
    where({
      byr: test(/19[2-9]\d|200[0-2]/),
      iyr: test(/201\d|2020/),
      eyr: test(/202\d|2030/),
      hgt: test(/((1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in)/),
      hcl: test(/^#[0-9a-f]{6}$/),
      ecl: test(/^(amb|blu|brn|gry|grn|hzl|oth)$/),
      pid: test(/^[0-9]{9}$/)
    })
  ),
  map(compose(
    fromPairs,
    map(split(':'))
  )),
  map(split(/\s+/)),
  getFileContentsWithSpaceInMac('day4/input')
)(fs)

console.log(valuesFromFile)
