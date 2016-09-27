// npm
import R from 'ramda'
import h from 'snabbdom/h'
import flyd from 'flyd'
import request from 'flyd-ajax'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'
import mix from 'array-shuffle'
import loaded from 'imagesloaded'

import dict from './image-dictionary'

const flatMap = R.curry(require('flyd/module/flatmap'))

const init = _ => {
  const state = {}
  return state
}

const attachImageLoaded = vnode => {
  loaded(vnode.elm)
    .on('always', x => {
      let el = x.elements[0]
      let height = x.images[0].img.offsetHeight
      el.parentElement.style.height = height
      el.style.opacity = 1
      el.style.top = -height * Math.floor(Math.random() * (20 - 5) + 5)
    })
}

const roulette = (state, ring) => {
  const mixt = mix(dict[ring])
  return h('div.col-3.p2.left.roulette-outer', [
    h('div.roulette-inner'
    , {hook: {insert: attachImageLoaded}}
    , R.map(x => h('img' , { props: {src: `images/${ring}/${x}.jpg`} }) , mixt))
  ])
}


const view = state => 
  h('div.container.p1', [
    h('div.clearfix', [
      roulette(state, 'inner')
    , roulette(state, 'middle')
    , roulette(state, 'outer')
    ])
  ]) 

let container = document.querySelector('#container')

const patch = snabbdom.init([
  require('snabbdom/modules/class')
, require('snabbdom/modules/props')
, require('snabbdom/modules/style')
, require('snabbdom/modules/eventlisteners')
, require('snabbdom/modules/attributes')
])

render({patch, container, view, state: init()})

