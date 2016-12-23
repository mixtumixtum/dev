import h from 'snabbdom/h'
import R from 'ramda'
import imgs from './gallery-image-names'
import attachImageLoaded from './attach-image-loaded'

module.exports = state =>  
  h('div', [
    h('h2.px1.italic', 'Gallery')
  , h('div', {hook: {insert: attachImageLoaded(state.galleryLoaded$)}}, 
      R.map(x => h('img.p1', {props: {src: `./images/${x}-400.jpg`}})
        , imgs))
  ])
