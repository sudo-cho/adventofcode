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
  update,
  replace,
  toPairs,
  tap
} = require('ramda')
const { isNotEmpty } = require('ramda-adjunct')

let arrayOfIndices = []
let arrayOfTest = ['nop +48']

const getAccValue = compose(last, split(' '), last)
const getActName = compose(head, split(' '), last)
const getNextTry = compose(
  juxt([
    head,
    compose(replace(/nop/, 'jmp'), last)
  ]),
  head,
  filter(both(
    compose(not, includes(__, arrayOfTest), last),
    compose(includes('nop'), last)
  )),
  tap(x => console.log('array of test', arrayOfTest))
)

const sequence = curry((acc, act, arr, curTry) => compose(
  when(
    compose(equals('nop'), head, split(' '), last),
    x => sequence(acc, arr[+(x[0]) + 1], arr, curTry)
  ),
  when(
    compose(equals('jmp'), head, split(' '), last),
    x => sequence(acc, arr[+(x[0]) + +getAccValue(x)], arr, curTry)
  ),
  when(
    compose(equals('acc'), head, split(' '), last),
    x => sequence(acc + +(getAccValue(x)), arr[+(x[0]) + 1], arr, curTry)
  ),
  // will catch final acc value, should add tryCatch
  // to remove error but la flemme-zer
  tap(x => arrayOfIndices.push(head(x))),
  when(
    compose(includes(__, arrayOfIndices), head),
    compose(
      x => {
        console.log('nextTry', getNextTry(arr)[0])
        return sequence(
          0,
          arr[0],
          update(+(getNextTry(arr)[0]), getNextTry(arr)[1], arr),
          getNextTry(arr)
        )
      },
      when(
        x => !(includes(curTry, arrayOfTest)),
        tap(x => arrayOfTest.push(curTry))
      ),
      tap(x => console.log(curTry)),
      tap(x => arrayOfIndices = []),
    )
  )
)(act))

const valuesFromFile = compose(
  list => sequence(0, head(list), list, arrayOfTest[0]),
  toPairs,
  getFileContents('day8/input')
)(fs)

console.log(valuesFromFile)
