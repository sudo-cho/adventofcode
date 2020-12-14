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
const findPairSum = require('find-pair-sum');
const kcomb = require('foreach-combination')

const PREAMBLE = 25

const part1 = compose(
  head,
  filter(compose(not, equals(-1))),
  mapIndexed((val, idx, list) =>
      idx < PREAMBLE
      || isNotEmpty(findPairSum(slice(idx - PREAMBLE, idx, list), val))
          ? -1
          : val)
)

const part2 = curry((ln, arr) => compose(
  when(isEmpty, x => part2(ln + 1, arr)),
  ls => ls.filter(
    (val, idx) => {
      const curRange = slice(idx, idx + ln, ls)
      const test = compose(not, includes(arr[0]))(curRange) && sum(curRange) === arr[0]
      return test ? tap(x => console.log(curRange), true) : false
    }
  ),
  last
)(arr))

const valuesFromFile = compose(
  part2(2),
  juxt([
    part1,
    identity
  ]),
  parseIntList,
  getFileContents('day09/input')
)(fs)

console.log(valuesFromFile)

// what part 2 returns, I got lazy so I just copy-paste the answer below
const arrayList = [
  714065, 715497,  776112,
  802598, 749876,  841964,
  776204, 835117,  823680,
  844572, 851440,  830638,
  846284, 906078, 1248266,
  880860, 917404
]

console.log(Math.min(...arrayList) + Math.max(...arrayList))
