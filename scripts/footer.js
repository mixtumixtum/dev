import h from 'snabbdom/h'
import link from './link'

module.exports = _ =>
  h('footer.px2.pb4.center.container', [
    h('hr.mb4')
  , h('img.spin', {props: {src: './images/mixtum-logo-trans-100.png'}})
  , h('p.small.mt3', "Copyright © 2016 Yutaka Houlette & Heidi Gustafson")
  ])


