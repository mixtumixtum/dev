import bricks from 'image-gallery'

module.exports = x =>  {
  bricks(x.elements[0], {use: [bricks.Responsive]})
}

