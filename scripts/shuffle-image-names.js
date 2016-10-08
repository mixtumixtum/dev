import shuffle from 'array-shuffle'
import dict from './symbol-dictionary'

module.exports = _ => ({
  inner: shuffle(dict.inner)
, middle: shuffle(dict.middle)
, outer: shuffle(dict.outer)
})

