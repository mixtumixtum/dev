import h from 'snabbdom/h'
import link from './link'

module.exports = _ =>
  h('footer.px2.pb4.pt3.center.container', [
    h('img.spin', {props: {src: './images/mixtum-logo-trans-100.png'}})
  , h('p.small', "Copyright © Yutaka Houlette & Heidi Gustafson")
  ])


