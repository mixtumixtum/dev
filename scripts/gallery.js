import h from 'snabbdom/h'
import R from 'ramda'
import imgs from './gallery-image-names'
import attachImageLoaded from './attach-image-loaded'

module.exports = state =>  
  h('div', {hook: {insert: attachImageLoaded(state.galleryLoaded$)}}, 
    R.map(x => h('img.p1', {props: {src: `./images/mixtum-${x}-400.jpg`}}), imgs))
