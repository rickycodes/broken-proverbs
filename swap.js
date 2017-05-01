const { en } = require('lingo')
const first = require('lodash.first')
// this is so overkill :s
module.exports = (array, x, y) => {
  // const clone = array.slice(0)
  const former = array[x]
  array[x] = array[y]
  array[y] = former
  const ax = array[x]
  const ay = array[y]
  if (en.isPlural(first(ax)) && en.isSingular(first(ay))) {
    ax[0] = en.singularize(first(ax))
    ay[0] = en.pluralize(first(ay))
  } else if (en.isSingular(first(ax)) && en.isPlural(first(ay))) {
    ax[0] = en.pluralize(first(ax))
    ay[0] = en.singularize(first(ay))
  }
  // return clone
}
