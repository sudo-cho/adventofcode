const {
  compose,
  invoker,
  split,
  toString,
  curry,
  trim,
  init
} = require('ramda')

const rfs = invoker(1, 'readFileSync')

const getFileContentsWithSign = curry((chara, name, fs) => compose(
  init,
  split(chara),
  toString,
  rfs(name)
)(fs))

exports.log = x => console.log(x)

exports.getFileContents =
  getFileContentsWithSign(/\n/)
exports.getFileContentsWithSpaceInMac =
  getFileContentsWithSign(/\n\n/)
