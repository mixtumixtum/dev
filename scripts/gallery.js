import h from 'snabbdom/h'
import R from 'ramda'
import imgs from './gallery-image-names'
import attachImageLoaded from './attach-image-loaded'
import shuffle from 'array-shuffle'

module.exports = state =>  
  h('div', {hook: {insert: attachImageLoaded(state.galleryLoaded$)}}, 
    R.map(x => h('img.p2', {props: {src: `./images/${x}-400.jpg`}})
      , shuffle(imgs)))
