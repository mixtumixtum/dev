// npm
import R from 'ramda'
import h from 'snabbdom/h'
import flyd from 'flyd'
import request from 'flyd-ajax'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'
import shuffle from 'array-shuffle'
import loaded from 'imagesloaded'

import dict from './image-dictionary'

const flatMap = R.curry(require('flyd/module/flatmap'))

const log = (a, b) => flyd.map(x => console.log(a, x), b)

const q = s => document.querySelectorAll(s)

const style = (el, styles) => R.map(s => el.style[s[0]] = s[1], styles)


const initSlot = h => {
  const inner = q('.slot-inner') 
  const outer = q('.slot-outer') 
  const caption = q('.slot-caption') 
  R.map(x => style(x, [['visibility', 'visible'],['height', `${h}px`]]), outer)
  R.map(x => style(x, [['margin-top', `-${h * 31}px`]]), inner)
  R.map(x => style(x, [['opacity', 1]]), caption)
}

const init = _ => {
  const state = {}
  state.imagesLoaded$ = flyd.stream()
  state.imageHeight$ = flyd.map(x => x.images[0].img.offsetHeight, state.imagesLoaded$) 
  flyd.map(initSlot, state.imageHeight$) 
  return state
}

const attachImageLoaded = state => vnode => 
  loaded(vnode.elm).on('always',  state.imagesLoaded$)

const slot = (state, col) => {
  const imageNames = shuffle(dict[col])
  return h('div.col-4.inline-block'
  , [ h('div.slot-outer', [
        h('div.slot-inner'
      , R.map(x => h('img' , {props: {src: `images/${col}/${x}.jpg`}}) , imageNames))
      ])
    , h('p.slot-caption.center', R.last(imageNames)) 
  ])
}


const view = state => 
  h('div.container.p1', [
    h('div.slots'
  , {hook: {insert: attachImageLoaded(state)}}
  , [
      slot(state, 'inner')
    , slot(state, 'middle')
    , slot(state, 'outer')
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

