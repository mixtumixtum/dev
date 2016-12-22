// npm
import R from 'ramda'
import h from 'snabbdom/h'
import flyd from 'flyd'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'

import q from './scripts/q'
import animate from './scripts/animate'
import shuffleImageNames from './scripts/shuffle-image-names'
import slots from './scripts/slots'
import about from './scripts/about'
import uses from './scripts/uses'
import gallery from './scripts/gallery'
import contact from './scripts/contact'
import footer from './scripts/footer'
import border from './scripts/border'
import brickIt from './scripts/brick-it'

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
  h('div.container' , [
    state.symbolsLoaded$() ? '' : h('p.h3.center', 'Loading...')
  , h('div.o0.fadeIn'
    , {style: {delayed: {opacity: state.symbolsLoaded$() ? 1 : 0}}}
    , [
        slots(state) 
      , about() 
      , uses() 
      , gallery(state)
      , contact()
      , footer()
      , border()
      ]
    ) 
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

