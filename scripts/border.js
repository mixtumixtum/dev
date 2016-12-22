import h from 'snabbdom/h'

const img = () => h('img', {props: {src: './images/border.png'}})

module.exports = () => h('div.borders', [
    img()
  , img()
  , img()
  , img()
  ])

