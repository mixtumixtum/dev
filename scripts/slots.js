import R from 'ramda'
import h from 'snabbdom/h'
import flyd from 'flyd'
import attachImageLoaded from './attach-image-loaded'

const slot = (state, key) => 
  h('div.col-4.inline-block', [
    h('div.slot-outer', 
      {hook: { insert: x => {x.elm.style.height = x.elm.offsetWidth + 'px'}}}
    , [ h('div.slot-inner'
        , R.map(a => h('img.block' , {props: {src: `images/${key}/${a}.jpg`}}) , state.imageNames$()[key] || []))
      ]
    )
  , h('p.small.center.slot-caption' ,R.last(state.imageNames$()[key] || []))
  ])

module.exports = state =>
  h('div.p2', [
    h('div.slots', {hook: {insert: attachImageLoaded(state.symbolsLoaded$)}}, [
        slot(state, 'inner')
      , slot(state, 'middle')
      , slot(state, 'outer')
    , h('div.center.mt2', [h('button.slot-button', {on: {click: state.clickRemix$}}, 'Remix')])
    ])
  ])


