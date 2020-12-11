const fs = require('fs')
const { getFileContents } = require('../utils/helpers.js')

const {
  compose,
  map,
  split,
  join,
  take,
  filter,
  intersection,
  curry,
  both,
  equals,
  tail,
  head,
  last,
  when,
  init,
  isEmpty,
  __,
  sum,
  is,
  forEach,
  match,
  tap
} = require('ramda')
const { isNotEmpty } = require('ramda-adjunct')

const colors = new Set()
const addColor = forEach(x => colors.add(x))

let lastColors = 1
// using clone method to avoid bad suprises with references copies
// I'm not familiar with mutations in JS
const storeLastColors = x => lastColors = JSON.parse(JSON.stringify({ size: colors.size }))

const getFirstColor = compose(join(' '), take(2), split(' '))
const getLastColor = compose(join(' '), init, tail, split(' '))
const getColorsFromSentence = compose(
  map(getFirstColor),
  match(/(?:\S+)?(?:\s\S+)?(?:\S+\s)?\S*bag(s)?/gm)
)

const getBagsWithColor = curry((color, arr) => compose(
  when(
    ls => colors.size !== lastColors.size,
    compose(
      getBagsWithColor(__, arr),
      tap(addColor),
      tap(storeLastColors)
    )
  ),
  map(getFirstColor),
  filter(
    both(
      compose(isNotEmpty, intersection(color), getColorsFromSentence),
      compose(isEmpty, intersection(color), getFirstColor)
    )
  )
)(arr))

const getCountBags = curry((color, count, arr) => compose(
  sum,
  map(elm => +(elm[0]) + +(elm[0]) * getCountBags(getLastColor(elm), count, arr)),
  when(is(String), match(/(\d+) (.+?) bag(s?)/gm)),
  head,
  filter(compose(equals(color), getFirstColor)),
)(arr))

const valuesFromFile = compose(
  getCountBags('shiny gold', 0),
  //  part 1
  // arr => colors.size,
  // getBagsWithColor(['shiny gold']),
  getFileContents('day7/input')
)(fs)

console.log(valuesFromFile)
