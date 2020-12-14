const fs = require('fs')
const { getFileContents, log } = require('../utils/helpers.js')

const {
  compose,
  map,
  split,
  includes,
  filter,
  juxt,
  head,
  last,
  curry,
  both,
  equals,
  not,
  when,
  __,
  update,
  replace,
  toPairs,
  tap
} = require('ramda')

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
  ))
)

// Bruteforce here is making the program to run around 500 sequence then fails.
// If the results is not displayed, then I'll store the test and start the program with
// the next 500 sequence.
// At the end I got the result but it needs refactoring in order to work in 1 try.
const sequence = curry((acc, act, arr, curTry) => compose(
  x => sequence(
    acc + (equals('acc', getActName(x)) ? +(getAccValue(x)) : 0),
    arr[+(x[0]) + (equals('jmp', getActName(x)) ? +(getAccValue(x)): 1)],
    arr,
    curTry
  ),
  // will catch final acc value, should add tryCatch
  // to remove error but la flemme-zer
  tap(x => console.log(acc)),
  tap(x => arrayOfIndices.push(head(x))),
  when(
    compose(includes(__, arrayOfIndices), head),
    compose(
      x => sequence(
        0,
        arr[0],
        update(+(getNextTry(arr)[0]), getNextTry(arr)[1], arr),
        getNextTry(arr)[1]
      ),
      when(
        x => !(includes(replace(/jmp/, 'nop', curTry), arrayOfTest)),
        tap(x => arrayOfTest.push(replace(/jmp/, 'nop', curTry)))
      ),
      tap(x => arrayOfIndices = [])
    )
  )
)(act))

const valuesFromFile = compose(
  list => sequence(0, head(list), list, arrayOfTest[0]),
  toPairs,
  getFileContents('day08/input')
)(fs)

console.log(valuesFromFile)
