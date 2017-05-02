const pos = require('pos')
const first = require('lodash.first')
const swap = require('./swap.js')

module.exports = (saying) => {
  const words = new pos.Lexer().lex(saying)
  const tagged = new pos.Tagger().tag(words)
  const nouns = tagged.map((tag, index) =>
    first(tag).length > 1 && /NN/.test(tag[1]) && { index, tag }
  ).filter(needle => needle)

  nouns.forEach((noun, index) => {
    if ((index % 2) === 0) {
      try {
        swap(tagged, nouns[index].index, nouns[++index].index)
      } catch (e) {}
    }
  })

  return tagged.map(word => first(word))
    .join(' ')
    .replace(` ' `, `'`)
    .replace(` '`, `'`)
    .replace(' .', '.')
    .replace(' ,', ',')
    .toLowerCase()
}
