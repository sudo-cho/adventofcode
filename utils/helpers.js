const {
  compose,
  invoker,
  split,
  toString,
  curry,
  init
} = require('ramda')

const rfs = invoker(1, 'readFileSync')

exports.getFileContents = curry((name, fs) => compose(
  init,
  split('\n'),
  toString,
  rfs(name)
)(fs))

exports.log = x => console.log(x)
