import loaded from 'imagesloaded'

module.exports = stream => vnode => loaded(vnode.elm).on('always',  stream)

