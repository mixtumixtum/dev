import h from 'snabbdom/h'
import link from './link'

module.exports = _ =>
  h('div.p1', [
    h('h2.italic', 'About')
  , h('p', "Mixtum is a tool that selects three random symbols as prompts for creative synthesis.  Mixtum can be used by artists, writers, educators, dancers, therapists, chefs or anybody engaged in a creative process.")
  , h('p', [
      "Mixtum comes from the latin term "
    , h('i', 'mixtum compositum. ')
    , "Siegfried Zeilinksi describes the concept in his book "
    , link("Deep Time of the Media: Toward an Archaeology of Hearing and Seeing by Technical Means"
      ,'https://www.amazon.com/Deep-Time-Media-Archaeology-Electronic/dp/026274032X')
  , ' as,'
    ])
  , h('blockquote', "...the mixtum compositum contains two elements that are far apart and strives to fuse two different worlds into one.")
  , h('img.fullWidth', {props: {src: './images/board-700.jpg'}})
  , h('p', "The first prototype of Mixtum was made by Heidi Gustafson and Yutaka Houlette while teaching together at an arts-based preschool in 2011. They soon saw that the boards could have a wider application beyond their classroom and decided to create a large batch of them.")
  ])



