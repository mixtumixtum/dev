// npm
import R from 'ramda'
import h from 'snabbdom/h'
import flyd from 'flyd'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'

import q from './q'
import animate from './animate'
import shuffleImageNames from './shuffle-image-names'
import slots from './slots'
import about from './about'
import uses from './uses'
import gallery from './gallery'
import brickIt from './brick-it'

const init = _ => {
  const state = {}

  state.symbolsLoaded$ = flyd.stream()

  state.galleryLoaded$ = flyd.stream()

  state.clickRemix$ = flyd.stream()

  state.imageNames$ = flyd.map(shuffleImageNames, flyd.merge(flyd.stream([]), state.clickRemix$))

  flyd.map(brickIt, state.galleryLoaded$)

  flyd.map(animate(state), flyd.merge(state.symbolsLoaded$, state.clickRemix$))

  return state
}

const view = state => 
  h('div.container.o0.trans0'
  , {style: {delayed: {opacity: state.symbolsLoaded$() ? 1 : 0}}}
  , [
      slots(state) 
    , about() 
    , uses() 
    , gallery(state)
    ]
  ) 

let container = document.querySelector('#container')

const patch = snabbdom.init([
  require('snabbdom/modules/class')
, require('snabbdom/modules/props')
, require('snabbdom/modules/style')
, require('snabbdom/modules/eventlisteners')
, require('snabbdom/modules/attributes')
])

render({patch, container, view, state: init()})

const getYear = _ => {let x = new Date(); return x.getFullYear()}

q('#year')[0].innerHTML = getYear() 
