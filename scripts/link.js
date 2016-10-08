import h from 'snabbdom/h'

module.exports = (text, href) => h('a', {props: {href, target: '_blank'} }, text) 


