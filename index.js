const pos = require('pos')
const input = process.argv[2]
const { en } = require('lingo')
const first = require('lodash.first')

const sayings = [
  `You can't teach an old dog new tricks`,
  `Give a man a fish and you feed him for a day. teach a man to fish and he'll eat forever`,
  `Health is better than wealth`,
  `Out of sight, out of mind`,
  `The more things change, the more they stay the same.`,
  `lol`
]

// this is so overkill :s
const swap = (array, x, y) => {
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

const bork = (saying) => {
  const words = new pos.Lexer().lex(saying)
  const tagged = new pos.Tagger().tag(words)
  const nouns = tagged.map((tag, index) => {
    return first(tag).length > 1 && /NN/.test(tag[1]) && { index, tag }
  }).filter(needle => needle)

  nouns.map((noun, index) => {
    if ((index % 2) === 0) {
      try {
        swap(tagged, nouns[index].index, nouns[++index].index)
      } catch (e) {}
    }
  })

  return tagged.map(word => first(word)).join(' ').toLowerCase().replace(` ' `, `'`)
}

console.log(input ? bork(input) : sayings.map(bork).join('\n'))
