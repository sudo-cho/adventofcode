const {
  compose,
  invoker,
  split,
  toString,
  curry,
  map,
  trim,
  init
} = require('ramda')

const rfs = invoker(1, 'readFileSync')

const getFileContentsWithSign = curry((chara, name, fs) => compose(
  split(chara),
  trim,
  toString,
  rfs(name)
)(fs))

exports.log = x => console.log(x)

exports.getFileContents =
  getFileContentsWithSign(/\n/)
exports.getFileContentsWithSpaceInMac =
  getFileContentsWithSign(/\n\n/)

exports.parseIntList = map(x => +(x))
