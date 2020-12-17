const fs = require('fs')
const { getFileContents, parseIntList } = require('../utils/helpers.js')

const {
  compose,
  includes,
  filter,
  juxt,
  head,
  last,
  curry,
  equals,
  not,
  when,
  slice,
  identity,
  isEmpty,
  sum,
  tap
} = require('ramda')
const { mapIndexed, isNotEmpty } = require('ramda-adjunct')

const valuesFromFile = compose(
  parseIntList,
  getFileContents('day09/input')
)(fs)

console.log(valuesFromFile)
