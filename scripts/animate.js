import R from 'ramda'
import q from './q'

module.exports = state => _ => {
  const caption = q('.slot-caption')
  const inner = q('.slot-inner')
  const button = q('.slot-button')[0]
  const h = q('.slot-inner img')[0].offsetHeight
  
  R.map(x => { 
      x.classList.remove('scroll')
      x.style.marginTop = 0 
    }, inner)
  R.map(x => { 
      x.classList.remove('fadeIn')
      x.style.opacity = 0 
    }, caption)
  window.setTimeout(x => {
    R.map(x => {
        x.classList.add('fadeIn')
        x.style.opacity = 1
      }, caption)
    R.map(x => {
        x.classList.add('scroll')
        x.style.marginTop = `-${h * 31}px`
      }, inner)

  }, 1)
  button.disabled = true
  button.innerHTML = 'Mixing...'
  window.setTimeout(_ => {
    button.innerHTML = 'Remix'
    button.disabled = false
  }, 3000)
}

