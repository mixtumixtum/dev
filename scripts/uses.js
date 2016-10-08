import h from 'snabbdom/h'
import R from 'ramda'
import link from './link'
import imgs from './gallery-image-names'

module.exports = _ =>
  h('div', [
    h('h2.italic', 'Uses')
  , h('p', "Mixtum has many uses, including, but not limited to...")
  , h('ul', [
      h('li',  [
        link("teaching art, photography and creative writing in classrooms"
          ,'http://chriswillsart.squarespace.com/mixtum/')])
    , h('li', [  
      link("writing a weekly horoscope for an online newspaper"
      , 'https://web.archive.org/web/20130908091838/http://whatweekly.com/2012/05/10/mixtum-horoscope/')])
    , h('li', [ 
        link("making experimental music", 'https://soundcloud.com/mixtumsounds')])
    , h('li', [
        link("performing at galleries", 'https://stampgallery.wordpress.com/home/past-exhibitions/futures-transcended/')])
    , h('li', [link("concocting strange snacks ","https://vimeo.com/28238937")])
    , h('li', [link("improvisational dancing ","https://vimeo.com/35861980")])
    ])
  , h('div', R.map(x => h('img', {props: {src: `./images/mixtum-${x}-400.jpg`}}), imgs))
  ])

