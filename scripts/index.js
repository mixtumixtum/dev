// npm
import R from 'ramda'
import h from 'snabbdom/h'
import flyd from 'flyd'
import request from 'flyd-ajax'
import render from 'flimflam-render'
import snabbdom from 'snabbdom'
import shuffle from 'array-shuffle'
import loaded from 'imagesloaded'
import sampleOn from 'flyd/module/sampleon'

import dict from './image-dictionary'

const flatMap = R.curry(require('flyd/module/flatmap'))

const log = (a, b) => flyd.map(x => console.log(a, x), b)

const shuffleImageNames = _ => ({
  inner: shuffle(dict.inner)
, middle: shuffle(dict.middle)
, outer: shuffle(dict.outer)
})
const q = s => document.querySelectorAll(s)

const style = (el, styles) => R.map(s => el.style[s[0]] = s[1], R.toPairs(styles))

const animate = state => _ => {
  const caption = q('.slot-caption')
  const inner = q('.slot-inner')
  const button = q('.slot-button')[0]
  R.map(x => { 
      x.classList.remove('scroll')
      x.style.marginTop = 0 
    }
  , inner)
  window.setTimeout(x => {
    R.map(x => {
        x.classList.add('scroll')
        x.style.marginTop = `-${state.height$() * 31}px`
      }
    , inner)
  }, 1)
  R.map(x => { 
      x.classList.remove('fadeIn')
      x.style.opacity = 0 
    }
  , caption)
  window.setTimeout(x => {
    R.map(x => {
        x.classList.add('fadeIn')
        x.style.opacity = 1
      }
    , caption)
  }, 1)
  button.disabled = true
  window.setTimeout(_ => {
    button.disabled = false
  }, 3000)
}


const init = _ => {
  const state = {}

  state.imagesLoaded$ = flyd.stream()

  state.height$ = flyd.map(x => x.images[0].img.offsetHeight, state.imagesLoaded$) 

  state.clickRemix$ = flyd.stream()

  state.imageNames$ = flyd.map(shuffleImageNames, flyd.merge(flyd.stream([]), state.clickRemix$))

  flyd.map(animate(state), flyd.merge(state.height$, state.clickRemix$))

  return state
}

const scroll = state => vnode => {
  vnode.elm.className = 'slot-inner'
  vnode.elm.className = 'slot-inner bleck'
}

const attachImageLoaded = state => vnode => 
  loaded(vnode.elm).on('always',  state.imagesLoaded$)

const slot = (state, key) => 
  h('div.col-4.inline-block', [
    h('div.slot-outer', 
      { style: { height: state.height$()}}
    , [ h('div.slot-inner'
        , R.map(a => h('img.block' , {props: {src: `images/${key}/${a}.jpg`}}) , state.imageNames$()[key] || []))
      ]
    )
  , h('p.small.center.slot-caption' ,R.last(state.imageNames$()[key] || []))
  ])

const slots = state =>
  h('div.slots', {hook: {insert: attachImageLoaded(state)}}, [
      slot(state, 'inner')
    , slot(state, 'middle')
    , slot(state, 'outer')
  , h('div.center.mt2', [h('button.slot-button', {on: {click: state.clickRemix$}}, 'Remix')])
  ])

const view = state => 
  h('div.container.p1.o0.trans0'
  , {style: {delayed: {opacity: state.imagesLoaded$() ? 1 : 0}}}
  , [
      slots(state) 
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

