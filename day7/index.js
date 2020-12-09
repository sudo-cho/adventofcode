const fs = require('fs')
const { getFileContents, log } = require('../utils/helpers.js')

const {
  compose,
  map,
  split,
  join,
  take,
  includes,
  filter,
  juxt,
  identity,
  reject,
  head,
  last,
  intersection,
  curry,
  both,
  equals,
  length,
  not,
  when,
  isEmpty,
  __,
  forEach,
  tap
} = require('ramda')
const { isNotEmpty } = require('ramda-adjunct')

const colors = new Set()
const addColor = forEach(x => colors.add(x))

let lastColors = []
const storeLastColors = x => {
  lastColors = []
  lastColors.push(...x)
}

const getFirstColor = compose(join(' '), take(2), split(' '))

const getBagsWithColor = curry((color, arr) => compose(
  when(
    compose(not, equals(lastColors.length), tap(log), length),
    compose(
      getBagsWithColor(__, arr),
      tap(storeLastColors),
      tap(addColor)
    )
  ),
  ls => {
    console.log('here', lastColors)
    return ls
  },
  map(getFirstColor),
  filter(
    both(
      compose(isNotEmpty, intersection(color)),
      compose(isEmpty, intersection(color), getFirstColor)
    )
  )
)(arr))

const valuesFromFile = compose(
  arr => colors.length,
  getBagsWithColor(['shiny gold']),
  getFileContents('day7/input')
)(fs)

console.log(valuesFromFile)
