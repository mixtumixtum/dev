import h from 'snabbdom/h'

module.exports = () =>  
  h('div.p2', [
    h('h2.italic', 'Contact')
  , h('ul', [
      h('li', 'Heidi Gustafson - heidi{at}earlyfutures.com')
    , h('li', 'Yutaka Houlette - yutakahoulette{at}gmail.com')
    ])

  ])

