import vhCheck from '../dist/vh-check.js'

const result = vhCheck({
  redefineVh: true,
})
const message = `${!result.isNeeded ? 'not ' : ''} needed.<br/>1vh is: ${
  result.value
}px`
const domCheckWrapper = document.querySelector('.js-check')
domCheckWrapper.innerHTML = message
